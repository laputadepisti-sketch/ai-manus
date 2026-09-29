# app/tools/terminal/expecter.py - deobfuscated

import asyncio
import json
import re

import pexpect


class MyExpecter(pexpect.Expecter):
    def my_expect_loop(self, PS1_REG, get_user_input):
        spawn = self.spawn
        existing_data = spawn._buffer
        new_data = ""
        errored = False

        while True:
            try:
                new_data = spawn.read_nonblocking(spawn.maxread, 0.1)
                if not new_data:
                    await asyncio.sleep(0.01)
                    continue
                existing_data += new_data
                end = re.search(PS1_REG, existing_data)
                if end:
                    break
            except pexpect.TIMEOUT:
                await asyncio.sleep(0.01)
            except pexpect.EOF:
                errored = True
                break

        result = existing_data
        # content after ps1 mark, this should not happen, res:
        return result
