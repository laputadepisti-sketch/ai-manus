# app/router.py - deobfuscated

import time

from fastapi import Request, Response
from fastapi.routing import APIRoute

from app.logger import logger


class TimedRoute(APIRoute):
    def get_route_handler(self):
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            url = request.url
            path = request.url.path
            logger.info(f"[>>] {request.method} {path}")
            start = time.time()
            response: Response = await original_route_handler(request)
            duration = round((time.time() - start) * 1000, 2)
            logger.info(f"[<<] Finished handling {path} in {duration}ms")
            return response

        return custom_route_handler
