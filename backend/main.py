from fastapi import FastAPI, HTTPException, File, UploadFile, Depends
import requests
from io import BytesIO
from fastapi.responses import StreamingResponse
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware
from  utils import expand_user_text, text_to_image, decode_text_from_image, encode_text_in_image
from  schema import PostInfo

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/text-generation")
async def get_post_and_expand_its_content(post_info: PostInfo):
    try:
        concatenated_text = (
            f"Location: {post_info.location}\n"
            f"Culprit Info: {post_info.culprit_info}\n"
            f"Current Situation: {post_info.current_situation}\n"
            f"Custom Text: {post_info.custom_text}\n"
            f"Number: {post_info.number}"
        )

        expanded_text = await expand_user_text(concatenated_text)

        # Return the expanded text as the help message
        return {"expanded_help_message": expanded_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing input or calling Gemini API\n Error:-  {e}") from e


@app.post("/img-generation")
async def create_image_from_prompt(input_data: str):
    try:
        prompt = input_data
        await text_to_image(prompt)

        return {"received_text": prompt}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while processing the input\n Error:- {e}") from e

@app.post("/encode")
async def encode_text(text: str, img_url: str = None, file: UploadFile = File(None)):
    try:
        # Ensure only one image source is provided
        if bool(img_url) == bool(file):
            raise HTTPException(status_code=400, detail="Please provide either an image URL or an image file, but not both.")
        
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
        return StreamingResponse(file, media_type="image/png", headers={"Content-Disposition": "attachment; filename=encoded_image.png"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/decode")
async def decode_text(img_url: str = None, file: UploadFile = File(None)):
    try:
        if bool(img_url) == bool(file):
            # Raise error if both or neither are provided
            raise HTTPException(status_code=400, detail="Please provide either an image URL or an image file, but not both.")
        
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