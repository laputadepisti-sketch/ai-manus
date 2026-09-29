# app/tools/terminal/terminal_manager.py - deobfuscated

import asyncio
import json
import os
import re
import signal
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

import pexpect
from pexpect.expect import searcher_re

from app.helpers.utils import truncate_text_from_back
from app.logger import logger
from app.tools.terminal.expecter import MyExpecter
from app.tools.terminal.terminal_helpers import process_terminal_output, split_bash_commands
from app.types.messages import TerminalInputMessage, TerminalOutputMessage

DEFAULT_WORKING_DIR = "/home/user"
DEFAULT_USER = "user"
IS_INSIDE_CONTAINER = False
COLUMNS = 80
GREEN = "\x1b[32m"
RESET = "\x1b[0m"
SIGTERM = signal.SIGTERM

PS1 = "[CMD_BEGIN]\\n\\u@\\h:\\w\\n[CMD_END]"
PS1_REG = "\\[CMD_BEGIN\\]\\s*(.*?)\\s*([a-z0-9_-]*)@([a-zA-Z0-9.-]*):(.+)\\s*\\[CMD_END\\]"


@dataclass
class TerminalHistoryItem:
    command: str
    timestamp: float
    finished: bool = False
    output: str = ""
    after_prompt: str = ""
    exec_dir: str = ""


class TerminalManager:
    def __init__(self):
        self.terminals = {}

    async def create_or_get_terminal(self, name: str) -> "Terminal":
        """Create a new terminal or return existing one"""
        if name not in self.terminals:
            self.terminals[name] = Terminal(name, DEFAULT_WORKING_DIR)
            await self.terminals[name].init(DEFAULT_WORKING_DIR)
        return self.terminals[name]

    def remove_terminal(self, name: str):
        """Remove a terminal"""
        if name in self.terminals:
            terminal = self.terminals[name]
            if terminal.is_alive():
                terminal.shell.terminate()
            del self.terminals[name]


class Terminal:
    is_running = False
    prompt_string = ""
    user_input_buffer = ""

    def __init__(self, name: str, default_wd: str):
        self.name = name
        self.default_wd = default_wd
        self._wd = default_wd
        self.shell = None
        self.history = []

    async def init(self, wd: str):
        self.history = []
        self.is_running = False
        self.user_input_buffer = ""
        user = DEFAULT_USER
        if not IS_INSIDE_CONTAINER:
            cmd = f"sudo su {user}"
        else:
            cmd = "/bin/bash --norc --noprofile"
        logger.info(f"Initializing terminal {self.name} with command: {cmd}")
        self.shell = pexpect.spawn(
            cmd,
            cwd=wd,
            encoding="utf-8",
            codec_errors="replace",
            dimensions=(24, COLUMNS),
        )
        self.shell.sendline(f'export PS1="{PS1}"; export PS2=""')
        self.shell.expect(PS1_REG)
        self.shell.sendline("export TERM=xterm-256color")
        self.shell.expect(PS1_REG)
        self.is_running = True
        logger.info(f"Terminal {self.name} initialized")

    def get_history(self, append_prompt_line: bool = False, full_history: bool = False) -> str:
        prompt = self.get_prompt_string()
        text = ""
        pre_prompt = f"{GREEN}{prompt}{RESET} " if prompt else ""
        for i, item in enumerate(self.history):
            cmd_line = f"{pre_prompt}{item.command}"
            text += cmd_line + "\n"
            text += item.output + "\n"
            if append_prompt_line:
                text += item.after_prompt + "\n"
        return truncate_text_from_back(text, 8000)

    async def reset(self):
        if self.shell and not self.shell.terminated:
            self.shell.sendcontrol("c")
            await asyncio.sleep(0.1)
            self.shell.terminate()
            await asyncio.sleep(0.1)
        await self.init(self._wd)

    async def execute_command(self, cmd_msg: TerminalInputMessage):
        """Execute a command in the terminal"""
        mode = cmd_msg.mode
        command = cmd_msg.command

        if mode != "idle":
            return cmd_msg.create_response("error", "mode mismatch")
        if not command:
            return cmd_msg.create_response("error", "command must be defined")

        logger.info(f"Executing command in terminal {self.name}: {command}")

        sub_commands = split_bash_commands(command)
        exec_dir = self._wd

        for i, sub_cmd in enumerate(sub_commands):
            item = TerminalHistoryItem(
                command=sub_cmd,
                timestamp=datetime.now().timestamp(),
            )
            prompt = self.get_prompt_string()
            item.exec_dir = exec_dir

            self._do_execute_command(sub_cmd)

            item.finished = True
            after_prompt = self.get_prompt_string()
            item.after_prompt = after_prompt
            self.history.append(item)

            output = process_terminal_output(item.output)
            text = json.dumps({"output": output})
            self.update_prompt_str()

        finished = len(sub_commands)
        result = self.get_history()
        return cmd_msg.create_response("finish", result, terminal_status="running",
                                       sub_command_index=finished)

    async def send_resp(self, ws, resp):
        """Send a response through websocket"""
        logger.info("Sending resp ")
        try:
            await ws.send_json(resp.model_dump())
        except Exception as e:
            logger.error(f"Error sending resp: {e}")

    async def kill_process(self):
        self._wd = self.default_wd
        if self.shell:
            self.shell.kill(SIGTERM)
            await asyncio.sleep(0.5)
        self.history = []
        await self.init(self._wd)

    async def send_control(self, cmd_msg: TerminalInputMessage):
        mode = cmd_msg.mode
        command = cmd_msg.command

        if mode != "running":
            return cmd_msg.create_response("error", "Terminal not running. Must use send_control on running terminal")
        if not command:
            return cmd_msg.create_response("error", "command must be defined")
        if len(command) != 1:
            return cmd_msg.create_response("error", "Control command must be a single character")

        self.user_input_buffer = ""
        self.shell.sendcontrol(command.upper())
        history = self.get_history()
        return cmd_msg.create_response("action_finish", history,
                                       output=f"control '{command}' sent to the terminal",
                                       terminal_status="running")

    async def write_to_process(self, text: str, enter: bool = True):
        self.user_input_buffer += text
        if enter:
            self.shell.sendline(self.user_input_buffer)
            self.user_input_buffer = ""
        else:
            self.shell.send(self.user_input_buffer)
            self.user_input_buffer = ""

    async def send_key(self, cmd_msg: TerminalInputMessage):
        mode = cmd_msg.mode
        command = cmd_msg.command

        if mode != "running":
            return cmd_msg.create_response("error", "Terminal not running. Must use send_key on running terminal")
        if not command:
            return cmd_msg.create_response("error", "command must be defined")

        self.user_input_buffer = ""
        self.shell.send(command)
        history = self.get_history()
        return cmd_msg.create_response("action_finish", history,
                                       output=f"key '{command}' sent to the terminal",
                                       terminal_status="running")

    async def send_line(self, cmd_msg: TerminalInputMessage):
        mode = cmd_msg.mode
        command = cmd_msg.command

        if mode != "running":
            return cmd_msg.create_response("error", "Terminal not running. Must use send_line on running terminal")
        if not command:
            return cmd_msg.create_response("error", "command must be defined")

        self.user_input_buffer = ""
        self.shell.sendline(command)
        history = self.get_history()
        return cmd_msg.create_response("action_finish", history,
                                       output=f"string '{command}\\n' sent to the terminal",
                                       terminal_status="running")

    def add_history(self, history: TerminalHistoryItem):
        """Add a command output to the history"""
        self.history.append(history)
        if len(self.history) > 100:
            self.history.pop(0)

    def get_prompt_string(self) -> str:
        self.update_prompt_str()
        return self.prompt_string

    def update_prompt_str(self):
        self.prompt_string = self._do_get_prompt_from_shell()

    def _do_get_prompt_from_shell(self) -> str:
        """
        构造一个 ps1 字符串
        类似: ubuntu@host:/home $
        """
        try:
            self.shell.sendline("echo $USER@$HOSTNAME:$PWD")
            after = self.shell.after
            output = str(after)
            match = re.match(PS1_REG, output)
            if match:
                groups = match.groups()
                prompt = groups[0].rstrip() if groups[0] else ""
                cwd = os.path.expanduser(self._wd).strip()
                return prompt
            else:
                logger.warning(f"Failed to parse bash prompt: {output}. This should not happen.")
                return f"@sandbox: {self._wd}"
        except Exception:
            logger.warning("Failed to get ps1, using default. this should not happen")
            if os.getuid() == 0:
                return "$"
            return "#"

    def _do_execute_command(self, command: str):
        self.shell.sendline(command + "\n")
        searcher = searcher_re([PS1_REG])
        result = self.shell.expect(searcher)
        logger.debug(f"[Terminal Updated - {self.name}]")
        logger.debug(f"Finished: {command}")
        logger.debug(f"Data: {json.dumps(self.shell.before)}")

    def is_alive(self) -> bool:
        """Check if the terminal process is still alive"""
        return self.shell.isalive()
