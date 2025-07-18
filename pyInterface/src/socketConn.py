import socket
import json

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

    def start_service(self) -> None:
        controllers = self.ingescapeDelegate.controllers

        while True:
            message = controllers
            encoded_message = json.dumps(message).encode('utf-8')

            assert self.sock is not None
            self.sock.sendto(encoded_message, (self.IP, self.port))






