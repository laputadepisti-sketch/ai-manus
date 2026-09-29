# app/tools/terminal/terminal_helpers.py - deobfuscated

import bashlex

from app.logger import logger


def split_bash_commands(commands: str) -> list:
    """
    能够将类似 'ls -l \n echo hello' 这样的命令拆分成两个单独的命令
    但是类似 'echo a && echo b' 这样的命令不会被拆分

    Copy from OpenHands:
    https://github.com/All-Hands-AI/OpenHands/blob/main/openhands/runtime/utils/bash.py
    """
    commands = commands.strip()
    if not commands:
        return []
    try:
        parts = bashlex.parse(commands)
    except bashlex.errors.ParsingError as e:
        logger.debug(
            f"Failed to parse bash commands\n[input]: {commands}\n"
            f"[warning]: {e}\nThe original command will be returned as is."
        )
        return [commands]

    result = []
    for part in parts:
        pos = part.pos
        cmd = commands[pos[0]:pos[1]].rstrip()
        logger.debug(f"BASH PARSING between: {pos}")
        logger.debug(f"BASH PARSING command: {cmd}")
        if result:
            result[-1] += " && " + cmd
        else:
            result.append(cmd)
    return result


def process_terminal_output(text: str) -> str:
    """
    处理终端输出，保留 ANSI 转义序列并正确处理行覆盖

    处理规则：
    1. 保留所有 ANSI 转义序列（\x1b[...m 颜色，\x1b[...G 光标移动等）
    2. 处理 \r 的行内覆盖效果
    3. 处理光标控制序列的行内覆盖效果
    """
    lines = text.split('\n')
    result_lines = []
    current_line = ""

    for line in lines:
        current_line = ""
        i = 0
        while i < len(line):
            if line[i] == '\x1b' and i + 1 < len(line) and line[i + 1] == '[':
                seq_start = i
                i += 2
                while i < len(line):
                    if line[i].isalpha() or line[i] in ('G', 'K'):
                        i += 1
                        break
                    try:
                        int(line[i])
                        i += 1
                    except ValueError:
                        i += 1
                        break
                seq = line[seq_start:i]
                if seq == '\x1b[2K':
                    current_line = ""
                elif seq.endswith('G'):
                    try:
                        pos = int(seq[2:-1])
                        pos = max(1, min(pos, len(current_line) + 1))
                    except ValueError:
                        pass
                else:
                    current_line += seq
            elif line[i] == '\r':
                current_line = ""
                i += 1
            else:
                current_line += line[i]
                i += 1
        result_lines.append(current_line)
    return '\n'.join(result_lines)
