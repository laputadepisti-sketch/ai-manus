# app/tools/browser/browser_manager.py - deobfuscated

import asyncio
import os
import random
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse

from browser_use import Browser, BrowserConfig
from browser_use.browser.context import BrowserContext, BrowserContextConfig, ScreenshotError
from browser_use.controller.service import Controller

from app.helpers.utils import upload_to_presigned_url
from app.logger import logger
from app.tools.browser.browser_actions import register_browser_actions

DEFAULT_WORKING_DIR = "/home/user"


class BrowserDeadError(Exception):
    pass


browser_actions: "BrowserManager" = None


class BrowserManager:
    status = "started"

    def __init__(self):
        chrome_instance_path = os.getenv("CHROME_INSTANCE_PATH")
        logger.info(f"CHROME_INSTANCE_PATH: {chrome_instance_path}")
        self.browser = Browser(
            config=BrowserConfig(chrome_instance_path=chrome_instance_path)
        )
        self.browser_context = BrowserContext(
            browser=self.browser,
            config=BrowserContextConfig(
                wait_for_network_idle_page_load_complete=True,
            ),
        )
        self.controller = Controller(include_attributes=[])
        register_browser_actions(self.controller, self)

    async def initialize(self):
        self.status = "initializing"
        await self.browser_context.get_session()
        self.status = "ready"

    async def recreate_page(self):
        page = await self.browser_context.get_current_page()
        if page:
            await page.close()
        await self.browser_context.create_new_tab()

    async def execute_action(self, cmd: dict):
        logger.info("executing actions")
        if self.status not in ("started", "ready"):
            logger.info("browser not initialized, starting initialization")
            await self.initialize()

        if self.status != "ready":
            logger.info("browser not ready, waiting for initialization")
            while self.status != "ready":
                await asyncio.sleep(0.5)

        try:
            await self.browser_context.ensure_page_alive()
        except Exception:
            await self.restart_browser()

        logger.info("page available, executing the action")
        action = cmd.get("action", {})
        result = await self.controller.execute_action(action, self.browser_context)
        logger.info(f"action execution finish, result {repr(result)}")

        logger.info("updating state...")
        state = await self.browser_context.get_session()
        cached_state = state
        logger.info("state updated")

        clickable_elements = {}
        for index, desc in state.clickable_elements.items():
            clickable_elements[str(index)] = desc[:]

        logger.info("taking screenshots")
        screenshot = None
        clean_screenshot = None
        try:
            page = await self.browser_context.get_current_page()
            url = page.url if page else ""
            screenshot = await self.browser_context.take_screenshot()
            logger.info(f"screenshot saved to {screenshot}")
            logger.info(", uploading screenshots")
        except ScreenshotError:
            pass

        logger.info("uploading screenshots")

        return {
            "status": "success",
            "title": getattr(result, "title", ""),
            "url": getattr(result, "url", ""),
            "extracted_content": getattr(result, "extracted_content", ""),
            "clickable_elements": clickable_elements,
            "screenshot": screenshot,
            "clean_screenshot": clean_screenshot,
            "should_show_markdown": getattr(result, "should_show_markdown", False),
            "article_markdown": getattr(result, "article_markdown", ""),
            "pixels_above": getattr(result, "pixels_above", 0),
            "pixels_below": getattr(result, "pixels_below", 0),
        }

    async def health_check(self):
        async def _check():
            browser = self.browser.get_playwright_browser()
            contexts = browser.contexts
            pages = [page for ctx in contexts for page in ctx.pages]
            for page in pages:
                logger.info(f"page url: {page.url}")
            return pages

        try:
            result = await asyncio.wait_for(_check(), timeout=5)
        except asyncio.TimeoutError:
            logger.error("Health check timed out after 5 seconds")
            raise BrowserDeadError("browser health check timeout")

    async def restart_browser(self):
        logger.info("try restart chrome")
        try:
            await self.browser.close()
        except Exception:
            pass
        await self.browser_context.close()
        logger.info("sudo supervisorctl restart chrome")
        from app.helpers.tool_helpers import run_shell
        await run_shell("sudo supervisorctl restart chrome")
        logger.info("chrome restarted")

    def get_screenshot_save_path(self, page_url: str) -> str:
        parsed = urlparse(page_url)
        hostname = (parsed.hostname or "").replace("www.", "").replace(".", "_")
        parts = [p for p in parsed.path.split("/") if p]
        path_part = "_".join(parts)
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        random_suffix = random.randint(1000, 9999)
        filename = f"{hostname}_{path_part}_{timestamp}_{random_suffix}.webp"
        save_dir = os.path.join(DEFAULT_WORKING_DIR, "screenshots")
        os.makedirs(save_dir, exist_ok=True)
        return os.path.join(save_dir, filename)

    async def upload_screenshots(self, cmd: dict, clean_screenshot: str, marked_screenshot: str):
        """Upload screenshots to presigned URLs."""
        if cmd.get("screenshot_presigned_url"):
            try:
                with open(marked_screenshot, "rb") as f:
                    data = f.read()
                await upload_to_presigned_url(data, cmd["screenshot_presigned_url"], "image/webp", "marked.webp")
                logger.info("Screenshot uploaded successfully to " + cmd["screenshot_presigned_url"])
            except Exception as e:
                logger.error(f"Failed to upload screenshot: {e}")
        else:
            logger.info("No presigned URL provided for screenshot, skipped uploading")

        if cmd.get("clean_screenshot_presigned_url"):
            try:
                with open(clean_screenshot, "rb") as f:
                    data = f.read()
                await upload_to_presigned_url(data, cmd["clean_screenshot_presigned_url"], "image/webp", "clean.webp")
                logger.info("Clean screenshot uploaded successfully to " + cmd["clean_screenshot_presigned_url"])
            except Exception as e:
                logger.error(f"Failed to upload clean screenshot: {e}")
        else:
            logger.info("No presigned clean URL provided for screenshot, skipped uploading")
