import requests
from datetime import datetime, timedelta
import time
from bs4 import BeautifulSoup
from gtts import gTTS
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from gridfs import GridFS

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = "Hackernews"
COLLECTION_NAME = "posts"

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

def store_in_mongodb(post_details, mp3_file_path):
    print("Storing in mongodb")
    client = MongoClient(MONGODB_URL)
    db = client[DB_NAME]
    fs = GridFS(db)
    collection = db[COLLECTION_NAME]

    try:
        with open(mp3_file_path, "rb") as mp3_file:
            mp3_data = mp3_file.read()
            mp3_id = fs.put(mp3_data, filename=os.path.basename(mp3_file_path))

        document = {
            "title": post_details["title"],
            "url": post_details.get("url", None),
            "content": post_details.get("content", None),
            "audio_file_id": mp3_id,  # Reference to GridFS file
            "created_at": datetime.now()
        }

        collection.insert_one(document)
        print(f"Stored in MongoDB: {post_details['title']}")
    except Exception as e:
        print(f"Failed to store in MongoDB: {e}")
    finally:
        client.close()

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
        print(f"Processing story: {story['title']}")
        content = scrape_article_content(story["url"])
        if not content: 
            print(f"Skipping story due to missing content {story['title']}")
            continue

        audio_filename = f"{story['title'].replace(' ', '_')}.mp3"
        text_to_speech(content, audio_filename)

        post_details = {
            "title": story["title"],
            "url": story["url"],
            "content": content
        }

        store_in_mongodb(post_details, audio_filename)
    
if __name__ == "__main__":
    main()
