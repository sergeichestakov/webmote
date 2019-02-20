import json
from browser import Browser
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket

browser = Browser()

class BrowserSocket(WebSocket):

    def handleMessage(self):
        data = json.loads(self.data)
        type = data['type']
        message = data['message']
        print(data)

        if type == "direction":
            browser.move(message)
        elif type == "search":
            self.handleSearch(message)
        elif type == "refresh":
            browser.refresh()
        elif type == "power":
            browser.power()
        elif type == "history":
            browser.history(message) 
        elif type == "link":
            browser.link(message) 

    def handleSearch(self, message):
        split = message.split(':')
        if len(split) > 1 and split[0].lower() == 'goto':
            url = ''.join(split[1:])
            browser.openWebsite(url)
        else:
            browser.search(message)

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
