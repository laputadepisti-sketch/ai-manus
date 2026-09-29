# app/terminal_socket_server.py - deobfuscated

import json

from fastapi import WebSocket, WebSocketDisconnect

from app.logger import logger
from app.tools.terminal.terminal_manager import TerminalManager
from app.types.messages import TerminalInputMessage, TerminalOutputMessage


class TerminalSocketServer:
    def __init__(self, terminal_manager: TerminalManager):
        self.terminal_manager = terminal_manager

    async def handle_connection(self, ws: WebSocket):
        try:
            await ws.accept()
            logger.info("Websocket connection accepted")
            while True:
                msg = await ws.receive_json()
                await self.handle_msg(msg, ws)
        except WebSocketDisconnect:
            logger.info("Websocket disconnected")
        except Exception as e:
            logger.error(f"Error: {e}")
        finally:
            await self.stop_all_tasks()
            logger.info("Closing websocket")

    async def stop_all_tasks(self):
        pass

    async def get_socket_message(self, msg: dict):
        pass

    async def send_resp(self, ws: WebSocket, resp):
        logger.info("Sending resp ")
        try:
            await ws.send_json(resp.model_dump())
        except Exception as e:
            logger.error(f"Error sending resp: {e}")

    async def handle_msg(self, msg: dict, ws: WebSocket):
        action_id = msg.get("action_id", "")
        logger.info(f"Handle terminal socket msg#{action_id} ")
        try:
            terminal = await self.terminal_manager.create_or_get_terminal(
                msg.get("terminal", "default")
            )
            input_msg = TerminalInputMessage(**msg)
            result = await terminal.execute_command(input_msg)
            await self.send_resp(ws, result)
        except Exception as e:
            logger.error(f"Error: {e}")
        logger.info(f"Finished handling msg#{action_id}")
