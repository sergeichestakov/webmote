from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains

class Browser:

    new_tabs = ["https://developer.mozilla.org/en-US/", "https://stackoverflow.com/", "https://www.reddit.com/", "https://news.ycombinator.com/"]
    default_site = "https://en.wikipedia.org/wiki/Main_Page"
    def __init__(self):
        self.browser = webdriver.Firefox()
        self.browser.maximize_window()
        self.populate()

    def populate(self):
        main_window = self.browser.current_window_handle
        self.browser.execute_script(f"window.location.href = '{self.default_site}'")

        #Open new tabs
        for tab in Browser.new_tabs:
            javascript = f"window.open('{tab}');"
            self.browser.execute_script(javascript)
            sleep(0.4)

        #Switch back to original tab
        self.browser.switch_to_window(main_window)

    '''Test functionality if running script as main'''
    def run(self):
        while(True):
            sleep(2)
            self.switchTabs('right')
            sleep(2)
            self.switchTabs('left')

    '''Voice Commands implemented as javascript executed in the browser'''
    def openTab(self):
        self.browser.execute_script("window.open('https://google.com')")

    def forward(self):
        self.browser.execute_script("window.history.forward();")

    def back(self):
        self.browser.execute_script("window.history.back();")

    def openWebsite(self, name):
        self.browser.execute_script("window.location.href = https://'" + name + ".com/'")

    def search(self, name):
        self.browser.execute_script(f"window.location.href = 'https://google.com/search?q={name}'")

    def move(self, direction):
        if direction in ["left", "right"]:
            self.switchTabs(direction)
        elif direction in ["up", "down"]:
            self.scroll(direction)

    def switchTabs(self, direction):
        tabs = self.browser.window_handles
        currTab = self.browser.current_window_handle
        currIndex = tabs.index(currTab)

        newIndex = self.getNewIndex(currIndex, direction)
        self.browser.switch_to_window(tabs[newIndex])

    def getNewIndex(self, currIndex, direction):
        maxIndex = len(self.browser.window_handles) - 1
        if(direction == 'left'):
            return currIndex - 1 if currIndex > 0 else maxIndex
        elif(direction == 'right'):
            return currIndex + 1 if currIndex < maxIndex else 0

    def getScrollKey(self, direction):
        return {
            'up': Keys.ARROW_UP,
            'down': Keys.ARROW_DOWN
        }[direction]

    #Scrolls up and down the page: direction should be 'up' or 'down'
    def scroll(self, direction):
        scrollKey = self.getScrollKey(direction)
        ActionChains(self.browser).key_down(scrollKey).perform()

    def close(self):
        self.browser.close()
        self.browser.quit()

def main():
    browser = Browser()
    browser.run()

if __name__ == "__main__":
    main()
