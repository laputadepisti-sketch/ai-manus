# app/tools/browser/browser_helpers.py - deobfuscated

import os

from app.logger import logger


def get_browser_session_dir():
    """Get the browser session directory path."""
    return os.path.join("/tmp", "browser_session")


def cleanup_browser_session():
    """Clean up the browser session directory."""
    session_dir = get_browser_session_dir()
    if os.path.exists(session_dir):
        try:
            import shutil
            shutil.rmtree(session_dir)
        except Exception as e:
            logger.error(f"Failed to clean up browser session: {e}")
