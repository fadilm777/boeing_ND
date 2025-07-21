import socket
import json
import copy

from ingescape import IngescapeDelegate

class UDPsender:
    """Send UDP data to FlyWithLua script to modify 
    navigation controls in cockpit"""

    def __init__(self, ingescapeDelegate: IngescapeDelegate,
                 ip: str, port: int) -> None:
        self.ingescapeDelegate = ingescapeDelegate
        self.IP = ip
        self.port = port
        self.sock = None
        self._initSocket()

    def _initSocket(self) -> None:
        assert self.sock is None
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def _prep_message(self, data) -> str:
        message = ""

        for key, value in data.items():
            msg_str = f'{key}:{value},'
            message += msg_str

        return message[:-1]

    def start_service(self) -> None:
        controllers = self.ingescapeDelegate.controllers
        old_message = {}

        while True:
            if controllers != old_message:
                message = self._prep_message(copy.deepcopy(controllers))
                encoded_message = message.encode()

                assert self.sock is not None
                self.sock.sendto(encoded_message, (self.IP, self.port))
                old_message = copy.deepcopy(controllers)
