# app/helpers/tool_helpers.py - deobfuscated

import asyncio
import subprocess

from app.logger import logger

MAX_RESPONSE_LEN = 16000
TRUNCATED_MESSAGE = "<response clipped>"


def maybe_truncate(content: str, truncate_after: int = MAX_RESPONSE_LEN) -> str:
    """Truncate content and append a notice if content exceeds the specified length."""
    if len(content) <= truncate_after:
        return content
    return content[:truncate_after] + f"\n{TRUNCATED_MESSAGE}"


async def run_shell(
    cmd: str,
    timeout: int = 30,
    truncate_after: int = MAX_RESPONSE_LEN,
    input: str = None,
) -> tuple:
    """Run a shell command asynchronously with a timeout."""
    logger.info(f"Running command: {cmd}")
    try:
        proc = await asyncio.create_subprocess_shell(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        stdout, stderr = await asyncio.wait_for(
            proc.communicate(input=input.encode() if input else None),
            timeout=timeout,
        )
        return (
            proc.returncode,
            maybe_truncate(stdout.decode(), truncate_after),
            maybe_truncate(stderr.decode(), truncate_after),
        )
    except asyncio.TimeoutError:
        proc.kill()
        return (None, f"Command '{cmd}' timed out after {timeout} seconds", "")
    except ProcessLookupError:
        return (None, "", "Process not found")
