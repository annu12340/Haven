import os
from io import BytesIO

import requests
from bson import Binary, ObjectId
from fastapi import FastAPI, File, HTTPException
from PIL import Image


# Utility functions
def serialize_object_id(document):
    """Recursively convert ObjectId to string in MongoDB documents."""
    if isinstance(document, dict):
        return {
            k: serialize_object_id(v) if isinstance(v, (dict, ObjectId)) else v
            for k, v in document.items()
        }
    if isinstance(document, ObjectId):
        return str(document)
    return document


def load_image_from_url_or_file(img_url=None, file=None):
    if bool(img_url) == bool(file):
        raise HTTPException(
            status_code=400, detail="Provide either an image URL or file, not both."
        )
    return (
        Image.open(BytesIO(requests.get(img_url).content))
        if img_url
        else Image.open(file.file)
    )


# Function to read files from the docs directory with improved error handling for encoding
def read_files_from_directory(directory: str):
    file_contents = []
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            try:
                with open(file_path, "r", encoding="utf-8") as file:
                    content = file.read()
                file_contents.append((filename, content))
            except UnicodeDecodeError:
                print(
                    f"Error reading {filename} as UTF-8. Trying a different encoding..."
                )
                try:
                    with open(file_path, "r", encoding="latin-1") as file:
                        content = file.read()
                    file_contents.append((filename, content))
                except Exception as e:
                    print(
                        f"Failed to read {filename} with both UTF-8 and latin-1 encodings. Error: {e}"
                    )
    return file_contents
