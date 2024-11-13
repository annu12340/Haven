# Built-in libraries
import base64
import logging
import os

# External dependencies
import boto3
from bson import ObjectId
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from backend.db import get_database, upload_embeddings_to_mongo
from backend.logger import CustomFormatter
from backend.schema import FileContent, PostInfo
from backend.utils.common import (load_image_from_url_or_file,
                                  read_files_from_directory,
                                  serialize_object_id)
from backend.utils.embedding import find_top_matches, generate_text_embedding
from backend.utils.regex_ptr import extract_info
from backend.utils.steganography import (decode_text_from_image,
                                         encode_text_in_image)
from backend.utils.text_llm import (create_poem, decompose_user_text,
                                    expand_user_text_using_bedrock,
                                    text_to_image)
from backend.utils.twitter import send_message_to_twitter

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(CustomFormatter())
logger.addHandler(handler)

# Initialize FastAPI and CORS middleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Environment and AWS setup
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET_NAME = os.getenv("S3_BUCKET_NAME", "shebuilds-womentechmakers")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION,
)
bedrock_client = boto3.client("bedrock-runtime", region_name=AWS_REGION)

# API Endpoints
@app.post("/text-generation")
async def get_post_and_expand_content(post_info: PostInfo):
    """Expand user input text for help message generation."""
    try:
        concatenated_text = "\n".join(
            [
                f"Name: {post_info.name}",
                f"Phone: {post_info.phone}",
                f"Location: {post_info.location['lat']},{post_info.location['lng']}",
                f"Duration of Abuse: {post_info.duration_of_abuse}",
                f"Frequency of Incidents: {post_info.frequency_of_incidents}",
                f"Preferred Contact Method: {post_info.preferred_contact_method[0]}",
                f"Current Situation: {post_info.current_situation}",
                f"Culprit Description: {post_info.culprit_description}",
            ]
        )
        bedrock_response = await expand_user_text_using_bedrock(bedrock_client, concatenated_text)
        return {"response": bedrock_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error expanding text: {e}")


@app.post("/img-generation")
async def create_image_from_prompt(input_data: str):
    """Generate an image based on a text prompt."""
    try:
        text_to_image(input_data)
        return {"received_text": input_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating image: {e}")


@app.post("/text-decomposition")
async def decompose_text_content(data: dict):
    """Decompose and extract information from user text."""
    try:
        text = data.get("text")
        decomposed_text = decompose_user_text(text)
        return {"extracted_data": extract_info(decomposed_text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error decomposing text: {e}")


@app.post("/save-extracted-data")
async def save_extracted_data(data: dict):
    try:
        db = get_database()
        db["admin"].insert_one(data)
        return {"status": "Data saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving data: {e}")


@app.post("/encode")
async def encode_text_in_image_endpoint(
    text: str, img_url: str = None, file: UploadFile = File(None)
):
    """Encode text into an image."""
    try:
        image = load_image_from_url_or_file(img_url, file)
        encoded_image = encode_text_in_image(image, text)
        output_path = "encoded_image.png"
        encoded_image.save(output_path, format="PNG")
        return StreamingResponse(
            open(output_path, "rb"),
            media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=encoded_image.png"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error encoding text in image: {e}"
        )


@app.post("/decode")
async def decode_text_from_image_endpoint(
    img_url: str = None, file: UploadFile = File(None)
):
    """Decode text from an image."""
    try:
        image = load_image_from_url_or_file(img_url, file)
        return {"decoded_text": decode_text_from_image(image)}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error decoding text from image: {e}"
        )


@app.get("/poem-generation")
async def create_poem_endpoint(text: str):
    """Generate an inspirational poem based on input text."""
    try:
        return {"poem": create_poem(text)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating poem: {e}")


@app.post("/send-message")
async def send_message_to_twitter_endpoint(image_url: str, caption: str):
    """Send a message to Twitter."""
    try:
        send_message_to_twitter(image_url, caption)
        return {"status": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error sending message to Twitter: {e}"
        )


@app.get("/get-admin-posts")
def get_all_posts():
    """Retrieve all posts from the database."""
    try:
        db = get_database()
        posts = [serialize_object_id(post) for post in db["admin"].find()]
        return JSONResponse(content=posts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving posts: {e}")


@app.get("/find-match")
def find_top_matching_posts(info: str, collection: str):
    """Find top matches based on embedding similarity."""
    try:
        db = get_database()
        description_vector = generate_text_embedding(info)
        top_matches = find_top_matches(db[collection], description_vector)
        return [serialize_object_id(match) for match in top_matches]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error finding matches: {e}")


@app.get("/get-post/{post_id}")
def get_post_by_id(post_id: str):
    """Retrieve a specific post by its ID."""
    try:
        db = get_database()
        post = db["admin"].find_one({"_id": ObjectId(post_id)})
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        return JSONResponse(content=serialize_object_id(post))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving post by ID: {e}")


@app.post("/upload_embeddings/")
async def upload_embeddings():
    """Upload embeddings to MongoDB."""
    try:
        file_contents = read_files_from_directory("backend/docs")
        upload_embeddings_to_mongo(file_contents)
        return {"message": "Embeddings uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading embeddings: {e}")
