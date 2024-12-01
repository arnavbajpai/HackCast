import requests
from datetime import datetime, timedelta
import time
from bs4 import BeautifulSoup
from gtts import gTTS

class HackerNewsFetcher:
    BASE_URL = "https://hacker-news.firebaseio.com/v0"

    def __init__(self):
        self.session = requests.Session()

    def get_top_stories_ids(self):
        response = self.session.get(f"{self.BASE_URL}/topstories.json")
        response.raise_for_status()
        return response.json()

    def get_story_details(self, story_id):
        response = self.session.get(f"{self.BASE_URL}/item/{story_id}.json")
        response.raise_for_status()
        return response.json()

    def is_story_recent(self, story_details, days=7):
        if not story_details or 'time' not in story_details:
            return False
        
        story_time = datetime.fromtimestamp(story_details['time'])
        seven_days_ago = datetime.now() - timedelta(days=days)
        return story_time >= seven_days_ago

    def fetch_recent_stories(self, limit=None, days=7):
        recent_stories = []
        story_ids = self.get_top_stories_ids()

        for story_id in story_ids:
            try:
                story_details = self.get_story_details(story_id)
                
                if self.is_story_recent(story_details, days):
                    recent_stories.append(story_details)
                    
                    if limit and len(recent_stories) >= limit:
                        break
                time.sleep(0.1)

            except requests.RequestException as e:
                print(f"Error fetching story {story_id}: {e}")

        return recent_stories
    
def scrape_article_content(url):
    try:
        response = requests.get(url, timeout = 10)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")

        paragraphs = soup.find_all("p")
        content = " ".join([p.get_text(strip=True) for p in paragraphs])
        return content
    except Exception as e:
        print(f"Failed to scrape {url} : {e}")
        return None
def text_to_speech(text, filename):
    tts = gTTS(text)
    tts.save(filename)
    
def main():
    hn_fetcher = HackerNewsFetcher()
    recent_stories = hn_fetcher.fetch_recent_stories(limit = 1)
    print(recent_stories)
    print(len(recent_stories))
    details = []
    for story in recent_stories:
        content = scrape_article_content(story["url"])
        title = story["title"] + ".mp3"
        text_to_speech(content, story["title"])
    
if __name__ == "__main__":
    main()
