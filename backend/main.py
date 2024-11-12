from io import BytesIO

import requests
from bson import ObjectId
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from PIL import Image

from backend.db import get_database
from backend.schema import PostInfo
from backend.utils.embedding import find_top_matches, generate_text_embedding
from backend.utils.regex_ptr import extract_info
from backend.utils.steganograpy import (decode_text_from_image,
                                        encode_text_in_image)
from backend.utils.text_llm import (create_poem, decompose_user_text,
                                    expand_user_text, text_to_image)
from backend.utils.twitter import send_message_to_twitter

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    return get_database()


db = get_db()

# Function to convert ObjectId to string
def serialize_post(post):
    post["_id"] = str(post["_id"])  # Convert ObjectId to string
    return post



# Endpoint to handle POST request and expand the user input
@app.post("/text-generation")
async def get_post_and_expand_its_content(post_info: PostInfo):
    try:

        concatenated_text = (
            f"Name: {post_info.name}\n"
            f"Phone: {post_info.phone}\n"
            f"Location: {post_info.location}\n"
            f"Duration of Abuse: {post_info.duration_of_abuse}\n"
            f"Frequency of Incidents: {post_info.frequency_of_incidents}\n"
            f"Preferred Contact Method: {post_info.preferred_contact_method}\n"
            f"Current Situation: {post_info.current_situation}\n"
            f"Culprit Description: {post_info.culprit_description}\n"
            f"Custom Text: {post_info.custom_text}\n"
        )

        expanded_text = await expand_user_text(concatenated_text)

        return {"expanded_help_message": expanded_text}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing input or calling Gemini API\n Error: {e}",
        ) from e

@app.post("/img-generation")
async def create_image_from_prompt(input_data: str):
    try:
        prompt = input_data
        text_to_image(prompt)

        return {"received_text": prompt}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the input\n Error:- {e}",
        ) from e


@app.post("/text-decomposition")
async def get_text_and_decompse_its_content(text: str):
    try:
        decomposed_user_text = decompose_user_text(text)
        print("decomposed_user_textdecomposed_user_textdecomposed_user_text",decomposed_user_text)
        extracted_data=extract_info(decomposed_user_text)
        return {"extracted_data": extracted_data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/encode")
async def encode_text(text: str, img_url: str = None, file: UploadFile = File(None)):
    try:
        # Ensure only one image source is provided
        if bool(img_url) == bool(file):
            raise HTTPException(
                status_code=400,
                detail="Please provide either an image URL or an image file, but not both.",
            )

        # Load the image from URL or uploaded file
        if img_url:
            response = requests.get(img_url)
            image = Image.open(BytesIO(response.content))
        elif file:
            image = Image.open(file.file)

        # Encode the text into the image
        encoded_image = encode_text_in_image(image, text)

        # Save the encoded image to a temporary file
        output_path = "encoded_image.png"
        encoded_image.save(output_path, format="PNG")

        # Open the saved file for streaming
        file = open(output_path, "rb")

        # Stream the file as a downloadable response
        return StreamingResponse(
            file,
            media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=encoded_image.png"},
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/decode")
async def decode_text(img_url: str = None, file: UploadFile = File(None)):
    try:
        if bool(img_url) == bool(file):
            # Raise error if both or neither are provided
            raise HTTPException(
                status_code=400,
                detail="Please provide either an image URL or an image file, but not both.",
            )

        if img_url:
            # Get image from URL
            response = requests.get(img_url)
            image = Image.open(BytesIO(response.content))
        elif file:
            # Get image from uploaded file
            image = Image.open(file.file)

        # Decode text from the image
        decoded_text = decode_text_from_image(image)
        return {"decoded_text": decoded_text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/poem-generation")
def create_inspiring_poems(text:str):
    try:
        poem = create_poem(text)
        return poem
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/send-message")
async def send_message(image_url: str, caption: str):
    send_message_to_twitter(image_url, caption)


# @app.post("/read-message")
# async def read_message():

#     response = await read_telegram_message()

#     if response.get("ok"):
#         return {"status": "Message read successfully", "response": response}
#     else:
#         raise HTTPException(
#             status_code=400,
#             detail=f"Failed to send message: {response.get('description')}",
#         )


# create a new endpoint to handle get all posts
@app.get("/get-all-posts")
def get_all_posts():
    try:
        collection = db["posts"]
        posts = collection.find()
        all_posts = [serialize_post(post) for post in posts]
        return JSONResponse(content=all_posts)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Function to convert ObjectId to string
def serialize_object_id(document):
    """Convert ObjectId to string in MongoDB document."""
    if isinstance(document, dict):
        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)  # Convert ObjectId to string
            elif isinstance(value, dict):
                document[key] = serialize_object_id(value)
    return document


@app.get("/find-match")
def get_top_matchs(info: str):
    # Assuming `generate_text_embedding` returns an embedding for the given description
    collection = db["complains2"]
    description_vector = generate_text_embedding(info)

    # Get top matches from MongoDB
    top_matches = find_top_matches(collection, description_vector)

    # Serialize any ObjectId fields in the matches
    serialized_matches = [serialize_object_id(match) for match in top_matches]

    # Return the serialized results
    return serialized_matches


# create a new endpoint to handle get post by id
@app.get("/get-post/{post_id}")
def get_post_by_id(post_id: str):
    try:
        collection = db["posts"]
        post = collection.find_one({"_id": ObjectId(post_id)})
        if post:
            return JSONResponse(content=serialize_post(post))
        else:
            raise HTTPException(status_code=404, detail="Post not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
