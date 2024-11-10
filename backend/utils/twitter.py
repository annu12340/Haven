import os

import requests
import tweepy
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()


def send_message_to_twitter(image_url, caption):
    CONSUMER_KEY = os.getenv("TWITTER_CONSUMER_KEY")
    CONSUMER_SECRET = os.getenv("TWITTER_CONSUMER_SECRET")
    ACCESS_KEY = os.getenv("TWITTER_ACCESS_TOKEN")
    ACCESS_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")
    BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

    # Authenticate to Twitter
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(
        ACCESS_KEY,
        ACCESS_SECRET,
    )
    newapi = tweepy.Client(
        bearer_token=BEARER_TOKEN,
        access_token=ACCESS_KEY,
        access_token_secret=ACCESS_SECRET,
        consumer_key=CONSUMER_KEY,
        consumer_secret=CONSUMER_SECRET,
    )

    api = tweepy.API(auth)
    # Download the image from the URL
    image_response = requests.get(image_url)

    if image_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to download the image")

    # Save the image to a temporary file
    image_path = "temp_image.png"
    with open(image_path, "wb") as file:
        file.write(image_response.content)

    try:
        # Upload the media using the v1.1 API
        media = api.media_upload(image_path)

        # Create the tweet using the v2 API
        post_result = newapi.create_tweet(text=caption, media_ids=[media.media_id])
        return {"message": "Tweet posted successfully", "data": post_result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Clean up the temporary image file
        if os.path.exists(image_path):
            os.remove(image_path)
