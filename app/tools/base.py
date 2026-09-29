# app/tools/base.py - deobfuscated

from dataclasses import dataclass, fields, replace
from typing import Any


@dataclass
class ToolResult:
    """Result of a tool execution."""
    output: Any = None
    error: str = None
    base64_image: str = None
    system: str = None

    def __bool__(self):
        return any(getattr(self, field.name) for field in fields(self))

    def __add__(self, other: "ToolResult"):
        return ToolResult(
            output=(self.output or "") + "\n" + (other.output or ""),
            error=(self.error or "") + "\n" + (other.error or ""),
            base64_image=other.base64_image or self.base64_image,
            system=other.system or self.system,
        )

    def replace(self, **kwargs):
        """Return a new ToolResult with replaced fields."""
        return replace(self, **kwargs)


@dataclass
class CLIResult(ToolResult):
    """A ToolResult that can be rendered as a CLI output."""
    pass


@dataclass
class ToolFailure(ToolResult):
    """A ToolResult that represents a failure."""
    pass


class ToolError(Exception):
    """Raised when a tool encounters an error."""
    def __init__(self, message):
        self.message = message
