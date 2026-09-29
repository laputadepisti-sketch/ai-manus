# app/types/messages.py - deobfuscated

from typing import Optional

from pydantic import BaseModel


class CommonApiResult(BaseModel):
    status: str = "success"
    error: Optional[str] = None


class FileInfo(BaseModel):
    path: str
    size: int


class TerminalApiResponse(CommonApiResult):
    pass


class TerminalInputMessage(BaseModel):
    terminal: str
    action_id: str
    command: str = None
    mode: str = "idle"

    def create_response(self, type: str, result: str, output: str = "",
                        terminal_status: str = "", sub_command_index: int = -1):
        return TerminalOutputMessage(
            terminal=self.terminal,
            action_id=self.action_id,
            type=type,
            result=result,
            output=output,
            terminal_status=terminal_status,
            sub_command_index=sub_command_index,
        )


class TerminalOutputMessage(BaseModel):
    terminal: str
    action_id: str
    type: str
    result: str
    output: str = ""
    terminal_status: str = ""
    sub_command_index: int = -1


class TerminalWriteApiRequest(BaseModel):
    terminal: str
    text: str
    enter: bool = True


class TextEditorAction(BaseModel):
    path: str
    command: str
    file_text: Optional[str] = None
    view_range: Optional[list] = None
    old_str: Optional[str] = None
    new_str: Optional[str] = None
    regex: Optional[str] = None
    sudo: bool = False
    glob: Optional[str] = None


class TextEditorActionResult(CommonApiResult):
    output: str = ""
    file_descriptor: Optional[FileInfo] = None


class BrowserAction(BaseModel):
    pass


class BrowserActionResult(CommonApiResult):
    title: str = ""
    url: str = ""
    extracted_content: str = ""
    clickable_elements: dict = {}
    screenshot: Optional[str] = None
    clean_screenshot: Optional[str] = None
    screenshot_presigned_url: Optional[str] = None
    clean_screenshot_presigned_url: Optional[str] = None
    should_show_markdown: bool = False
    article_markdown: str = ""
    pixels_above: int = 0
    pixels_below: int = 0


class BrowserActionRequest(BaseModel):
    action: dict
