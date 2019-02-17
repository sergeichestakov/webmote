from modules.controlBrowser import Browser
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

browser = None

class BrowserSocket(WebSocket):

    def handleMessage(self):
        direction = self.data 
        if browser:
            pass

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')

def main():
    browser = Browser()
    server = SimpleWebSocketServer('', 8000, BrowserSocket)
    server.serveforever()

def close(camera, browser):
    browser.close()
    camera.release()
    cv2.destroyAllWindows() 

if __name__ == "__main__":
    main()
