from multiprocessing import Process

from src.socketConn import UDPsender
from src.ingescape import IngescapeDelegate 
from src.plane import Navigator


if __name__ == "__main__":
    igs = IngescapeDelegate()
    nav = Navigator(igs)
    sender = UDPsender(igs, ip='127.0.0.1', port=7070)

    p1 = Process(target=nav.start_server)
    p2 = Process(target=sender.start_service)

    # These will run forever
    p1.start() # Start navigator server
    p2.start() # Start UDP sender service

