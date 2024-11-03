from fastapi import FastAPI, HTTPException
import requests
from io import BytesIO
from fastapi.responses import StreamingResponse
from PIL import Image

from  utils import expand_user_text, text_to_image, decode_text_from_image, encode_text_in_image
from  schema import PostInfo, StegoRequest

app = FastAPI()

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
async def encode_text(request: StegoRequest):
    try:
        # Get image from URL
        response = requests.get(request.image_url)
        image = Image.open(BytesIO(response.content))

        # Encode text into the image
        encoded_image = encode_text_in_image(image, request.text)
        
        # Save the encoded image to a temporary file
        output_path = "encoded_image.png"
        encoded_image.save(output_path, format="PNG")

        # Open the saved file for streaming
        file = open(output_path, "rb")

        # Stream the file as a downloadable response
        return StreamingResponse(file, media_type="image/png", headers={"Content-Disposition": "attachment; filename=encoded_image.png"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
