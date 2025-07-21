import threading

from src.socketConn import UDPsender
from src.ingescape import IngescapeDelegate 
from src.plane import Navigator


if __name__ == "__main__":
    igs = IngescapeDelegate()
    nav = Navigator(igs)
    sender = UDPsender(igs, ip='127.0.0.1', port=7070)

    # Start UDP sender in a different thread for non-blocking operation
    sender_thread = threading.Thread(target=sender.start_service)
    sender_thread.start() # Will run forever

    nav.start_server() # Will run forever


