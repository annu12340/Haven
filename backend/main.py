from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


app = FastAPI()

# Define data model for user input with the name PostInfo
class PostInfo(BaseModel):
    location: str
    culprit_info: str
    current_situation: str
    custom_text: str
    number: str

# Endpoint to handle input and concatenate fields
@app.post("/user/post")
async def submit_data(post_info: PostInfo):
    try:
        # Concatenate fields into a single string
        concatenated_text = (
            f"Location: {post_info.location}\n"
            f"Culprit Info: {post_info.culprit_info}\n"
            f"Current Situation: {post_info.current_situation}\n"
            f"Custom Text: {post_info.custom_text}\n"
            f"Number: {post_info.number}"
        )
        # Return the concatenated string
        return {"concatenated_text": concatenated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing input") from e
