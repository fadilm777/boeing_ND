import threading

from src.socketConn import UDPsender
from src.ingescape import IngescapeDelegate 
from src.plane import Navigator


if __name__ == "__main__":
    igs = IngescapeDelegate()
    nav = Navigator(igs)
    nav.start_server() # Will run forever


