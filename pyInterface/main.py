import threading

from src.socketConn import UDPsender
from src.ingescape import IngescapeDelegate 
from src.plane import Navigator


if __name__ == "__main__":
    igs = IngescapeDelegate()
    nav = Navigator(igs)
    sender = UDPsender(igs, ip='127.0.0.1', port=7070)

    service1 = threading.Thread(target=nav.start_server)
    service2 = threading.Thread(target=sender.start_service)

    service1.start()
    service2.start()


