from modules.browser import Browser
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

browser = Browser()

class BrowserSocket(WebSocket):

    def handleMessage(self):
        direction = self.data 
        print(direction)
        browser.move(direction)

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')
        browser.close()

def main():
    server = SimpleWebSocketServer('', 8000, BrowserSocket)
    server.serveforever()

if __name__ == "__main__":
    main()
