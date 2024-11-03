from fastapi import FastAPI, HTTPException

from utils import expand_user_text, text_to_image
from schema import PostInfo

app = FastAPI()

@app.post("/user/post")
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


@app.post("/user/img-generation")
async def create_image_from_prompt(input_data: str):
    try:
        prompt = input_data
        await text_to_image(prompt)

        return {"received_text": prompt}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred while processing the input\n Error:- {e}") from e