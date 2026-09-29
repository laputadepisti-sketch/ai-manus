# app/tools/text_editor.py - deobfuscated

import os
import re
from enum import Enum
from glob import glob
from pathlib import Path
from typing import Literal, Optional

from app.helpers.tool_helpers import MAX_RESPONSE_LEN, TRUNCATED_MESSAGE, maybe_truncate, run_shell
from app.logger import logger
from app.tools.base import ToolError, ToolResult
from app.types.messages import FileInfo

DEFAULT_WORKING_DIR = "/home/user"
SNIPPET_LINES = 6

Command = Literal[
    "view_dir",
    "view",
    "create",
    "write",
    "str_replace",
    "find_content",
    "find_file",
]


class TextEditor:
    def __init__(self):
        super().__init__()

    async def run_action(self, action) -> ToolResult:
        path = action.path
        command = action.command
        file_text = action.file_text
        view_range = action.view_range
        old_str = action.old_str
        new_str = action.new_str
        regex = action.regex
        sudo = action.sudo
        glob_pattern = action.glob

        if command == "view_dir":
            return await self.view_dir(path)
        elif command == "view":
            return await self.view(path, view_range=view_range, sudo=sudo)
        elif command == "create":
            if not file_text:
                raise ToolError("Parameter `file_text` is required for command: create")
            await self.write_file(path, file_text, sudo=sudo)
            return ToolResult(output=f"File created successfully at: {path}",
                              system=f"FileInfo(path={path})")
        elif command == "write":
            if not file_text:
                raise ToolError("Parameter `file_text` is required for command: write")
            await self.write_file(path, file_text, sudo=sudo)
            return ToolResult(output=f"File written successfully at: {path}",
                              system=f"FileInfo(path={path})")
        elif command == "str_replace":
            if not old_str:
                raise ToolError("Parameter `old_str` is required for command: str_replace")
            return await self.str_replace(path, old_str, new_str or "", sudo=sudo)
        elif command == "find_content":
            if not regex:
                raise ToolError("Parameter `regex` is required for command: find_content")
            return await self.find_content(path, regex, sudo=sudo)
        elif command == "find_file":
            if not glob_pattern:
                raise ToolError("Parameter `glob` is required for command: find_file")
            return await self.find_file(path, glob_pattern)
        else:
            args = list(Command.__args__)
            raise ToolError(
                f"Unrecognized command {command}. The allowed commands for the TextEditor tool are: {', '.join(args)}"
            )

    def validate_path(self, command: str, path: str):
        """Check that the path/command combination is valid."""
        if not Path(path).is_absolute():
            path = str(Path(DEFAULT_WORKING_DIR) / path)

        if command in ("create", "write"):
            pass
        elif not Path(path).exists():
            raise ToolError(f"The path {path} does not exist. Please provide a valid path.")

        if command not in ("create", "write"):
            if Path(path).is_dir():
                raise ToolError(f"{path} is a directory. Directory operations are not supported for this command.")

        if command == "create":
            if Path(path).is_file() and Path(path).stat().st_size > 0:
                raise ToolError(
                    f"Non-empty file already exists at: {path}. "
                    "Cannot overwrite no-empty files using command `create`."
                )
        elif command == "view_dir":
            if not Path(path).is_dir():
                raise ToolError(f"{path} is not a directory.")

    async def view_dir(self, path: str) -> ToolResult:
        """List contents of a directory"""
        try:
            _, stdout, _ = await run_shell(f"find {path} -maxdepth 2 -not -path '*/\\.*'")
            return ToolResult(output=f"Directory listing for {path}:\n{stdout}",
                              system=f"FileInfo(path={path})")
        except ToolError:
            raise
        except Exception as e:
            raise ToolError(f"Error listing directory {path}: {e}")

    async def view(self, path: str, view_range: Optional[list] = None, sudo: bool = False) -> ToolResult:
        """Implement the view command"""
        if view_range is not None:
            if len(view_range) != 2 or not all(isinstance(i, int) for i in view_range):
                raise ToolError("Invalid `view_range`. It should be a list of two integers.")

        file_content = await self.read_file(path, sudo=sudo)
        all_lines = file_content.split("\n")

        if view_range is not None:
            start, end = view_range
            start = max(1, start)
            end = min(len(all_lines), end)
            file_content = "\n".join(all_lines[start - 1:end])
            init_line = f"[File: {path} ({len(all_lines)} lines total, showing lines {start}-{end})]"
        else:
            init_line = f"[File: {path} ({len(all_lines)} lines total)]"

        file_descriptor = FileInfo(path=path, size=len(file_content))
        output = self._make_output(file_content, file_descriptor, init_line)
        return ToolResult(output=output, system=f"FileInfo(path={path})")

    async def str_replace(self, path: str, old_str: str, new_str: str = "", sudo: bool = False) -> ToolResult:
        """Implement the str_replace command, which replaces old_str with new_str in the file content"""
        file_content = await self.read_file(path, sudo=sudo)
        file_content = file_content.expandtabs()
        old_str = old_str.expandtabs()
        new_str = new_str.expandtabs()

        if file_content.count(old_str) == 0:
            raise ToolError(
                f"No replacement was performed, old_str `{old_str}` did not appear verbatim in {path}."
            )
        elif file_content.count(old_str) > 1:
            lines = file_content.split("\n")
            matching_lines = [f"{i}: {line}" for i, line in enumerate(lines, 1) if old_str in line]
            raise ToolError(
                f"No replacement was performed. Multiple occurrences of old_str `{old_str}` in lines "
                f"{', '.join(matching_lines)}. Please ensure it is unique"
            )

        new_content = file_content.replace(old_str, new_str)
        await self.write_file(path, new_content, sudo=sudo)

        lines = new_content.split("\n")
        replacement_line = lines.index(new_str.split("\n")[0]) if new_str else 0
        start = max(0, replacement_line - SNIPPET_LINES)
        end = min(len(lines), replacement_line + SNIPPET_LINES)
        snippet = "\n".join(lines[start:end])

        file_descriptor = FileInfo(path=path, size=len(new_content))
        init_line = f"The file {path} has been edited. "
        output = self._make_output(snippet, file_descriptor,
                                   init_line + f"a snippet of {len(lines)} lines")
        output += "Review the changes and make sure they are as expected. Edit the file again if necessary."
        return ToolResult(output=output, system=f"FileInfo(path={path})")

    async def find_content(self, path: str, regex: str, sudo: bool = False) -> ToolResult:
        """Implement the find_content command, which searches for content matching regex in file"""
        try:
            file_content = await self.read_file(path, sudo=sudo)
            pattern = re.compile(regex)
        except re.error:
            raise ToolError(f'Invalid regular expression "{regex}": ')
        except Exception as e:
            raise ToolError(f"Error searching file {path}: {e}")

        lines = file_content.split("\n")
        matches = []
        for i, line in enumerate(lines, 1):
            if pattern.search(line):
                matches.append(f"{i}: {line}")

        if not matches:
            return ToolResult(output=f'No matches found for pattern "{regex}" in {path}',
                              system=f"FileInfo(path={path})")

        output = "\n".join(matches)
        output = maybe_truncate(output)
        return ToolResult(
            output=f"Found {len(matches)} matches in {path}:\n{output}",
            system=f"FileInfo(path={path})",
        )

    async def find_file(self, path: str, glob_pattern: str) -> ToolResult:
        """Implement the find_file command, which finds files matching glob pattern"""
        if not Path(path).is_dir():
            raise ToolError(f"Path {path} must be a directory")
        try:
            files = sorted(glob(os.path.join(path, glob_pattern)))
        except Exception as e:
            raise ToolError(f"Error searching for files in {path}: {e}")

        if not files:
            return ToolResult(output=f'No files found matching pattern "{glob_pattern}" in {path}',
                              system=f"FileInfo(path={path})")
        return ToolResult(
            output=f'Found {len(files)} files matching "{glob_pattern}":\n' + "\n".join(files),
            system=f"FileInfo(path={path})",
        )

    async def read_file(self, path: str, sudo: bool = False) -> str:
        """Read the content of a file from a given path; raise a ToolError if an error occurs."""
        try:
            if sudo:
                _, stdout, _ = await run_shell(f'sudo cat "{path}"')
                return stdout
            return Path(path).read_text()
        except Exception as e:
            raise ToolError(f"Ran into {e} while trying to read {path}")

    async def write_file(
        self,
        path: str,
        content: str,
        sudo: bool = False,
        append: bool = False,
        trailing_newline: bool = True,
        leading_newline: bool = False,
    ):
        """Write the content of a file to a given path; raise a ToolError if an error occurs.
        Creates parent directories if they don't exist.

        Args:
            path: The path to write to
            content: The content to write
            sudo: Whether to use sudo privileges
            append: If True, append content to file instead of overwriting
        """
        if trailing_newline:
            content += "\n"
        if leading_newline:
            content = "\n" + content

        try:
            Path(path).parent.mkdir(parents=True, exist_ok=True)
            if sudo:
                mode = "-a" if append else ""
                _, _, _ = await run_shell(f'sudo tee {mode} "{path}"', input=content)
            else:
                mode = "a" if append else "w"
                with open(path, mode) as f:
                    f.write(content)
        except Exception as e:
            raise ToolError(f"Ran into {e} while trying to write to {path}")

    def _make_output(
        self,
        file_content: str,
        file_descriptor: FileInfo,
        init_line: str = "",
        expand_tabs: bool = True,
    ) -> str:
        """Generate output for the CLI based on the content of a file."""
        if expand_tabs:
            file_content = file_content.expandtabs()
        if len(file_content) > MAX_RESPONSE_LEN:
            file_content = maybe_truncate(file_content)
        lines = file_content.split("\n")
        numbered = "\n".join(f"{i + 1:>6}\t{line}" for i, line in enumerate(lines))
        return (
            f"{init_line}Here's the result of running `cat -n` on {file_descriptor.path}:\n{numbered}\n"
        )
