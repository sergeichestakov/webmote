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
        self.linkIndex = 0
        self.links = None
        self.prevLinkIndex = None
        self.prevStyle = None
        self.on = True

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

    def openTab(self):
        self.browser.execute_script("window.open('https://google.com')")

    def history(self, direction):
        self.resetLinkInfo(False)
        if direction in ["forward", "back"]:
            self.browser.execute_script(f"window.history.{direction}();")

    def link(self, message):
        links = self.links if self.links else self.browser.find_elements_by_tag_name('a')
        self.links = links
        if message == "up":
            self.linkIndex = (self.linkIndex - 1) if self.linkIndex > 0 else len(links) - 1
            self.highlightLink(links)
        elif message == "down":
            self.linkIndex = (self.linkIndex + 1) % len(links)
            self.highlightLink(links)
        elif message == "enter":
            if self.linkIndex < len(links):
                curr_href = links[self.linkIndex].get_attribute('href')
                if curr_href:
                    self.browser.get(curr_href)
                    self.resetLinkInfo(False)

    def highlightLink(self, links):
        link = links[self.linkIndex]
        href = link.get_attribute('href')
        style = "background: yellow; color: Red; border: 4px"

        if self.prevLinkIndex is not None:
            prevLink = links[self.prevLinkIndex]
            self.browser.execute_script("arguments[0].setAttribute('style', arguments[1])", prevLink, self.prevStyle) 

        self.prevStyle = link.get_attribute('style')
        self.prevLinkIndex = self.linkIndex

        self.browser.execute_script("arguments[0].scrollIntoView(true)", link)
        self.browser.execute_script("arguments[0].setAttribute('style', arguments[1])", link, style) 
    def openWebsite(self, url):
        self.browser.execute_script(f"window.location.href = 'https://{url}'")

    def resetLinkInfo(self, check=False):
        if check and self.prevLinkIndex is not None:
            links = self.links
            if links and self.prevLinkIndex < len(links):
                prevLink = links[self.prevLinkIndex]
                self.browser.execute_script("arguments[0].setAttribute('style', arguments[1])", prevLink, self.prevStyle) 

        self.linkIndex = 0
        self.prevLinkIndex = None
        self.links = None
        self.prevStyle = None

    def search(self, name):
        self.browser.execute_script(f"window.location.href = 'https://google.com/search?q={name}'")

    def refresh(self):
        self.browser.refresh()
        self.resetLinkInfo(False)

    def power(self):
        if self.on:
            self.close()
        else:
            self.browser = webdriver.Firefox()
            self.browser.maximize_window()
            self.populate()

        self.on = not self.on

    def move(self, direction):
        if direction in ["left", "right"]:
            self.switchTabs(direction)
        elif direction in ["up", "down"]:
            self.scroll(direction)

    def switchTabs(self, direction):
        self.resetLinkInfo(True)
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
