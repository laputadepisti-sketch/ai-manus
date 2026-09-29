# app/types/browser_types.py - deobfuscated

from typing import Optional

from pydantic import BaseModel


class NoParamAction(BaseModel):
    pass


class BrowserAction(BaseModel):
    pass


class BrowserActionResult(BaseModel):
    pass


class BrowserNavigateAction(BrowserAction):
    url: str


class BrowserClickAction(BrowserAction):
    index: int


class BrowserInputAction(BrowserAction):
    text: str


class BrowserViewAction(BrowserAction):
    pass


class BrowserScreenshotAction(BrowserAction):
    pass


class BrowserScrollUpAction(BrowserAction):
    pixels: int = 300


class BrowserScrollDownAction(BrowserAction):
    pixels: int = 300


class BrowserPressKeyAction(BrowserAction):
    key: str


class BrowserSelectOptionAction(BrowserAction):
    index: int
    value: str


class BrowserMoveMouseAction(BrowserAction):
    x: int
    y: int


class BrowserConsoleExecAction(BrowserAction):
    script: str


class BrowserConsoleViewAction(BrowserAction):
    pass


class BrowserRestartAction(BrowserAction):
    pass


class ExtractPageContentAction(BrowserAction):
    pass


class ScrollToTextAction(BrowserAction):
    text: str


class SaveScreenshotAction(BrowserAction):
    pass


class SaveImageAction(BrowserAction):
    pass


class GetDropdownOptionsAction(BrowserAction):
    index: int


class SelectDropdownOptionAction(BrowserAction):
    index: int
    value: str


class ViewAction(BrowserAction):
    pass


class DoneAction(NoParamAction):
    pass
