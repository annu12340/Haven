from pydantic import BaseModel

class PostInfo(BaseModel):
    location: str
    culprit_info: str
    current_situation: str
    custom_text: str
    number: str

class StegoRequest(BaseModel):
    image_url: str
    text: str