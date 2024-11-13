from typing import Optional

from pydantic import BaseModel


class PostInfo(BaseModel):
    name: str
    phone: str
    location: object
    duration_of_abuse: str
    frequency_of_incidents: str
    preferred_contact_method: list[str]
    current_situation: str
    culprit_description: str
    custom_text: Optional[str] = None


# Pydantic model to validate input
class FileContent(BaseModel):
    filename: str
    content: str
