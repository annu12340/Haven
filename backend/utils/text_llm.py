import os

import google.generativeai as genai
from dotenv import load_dotenv

from backend.prompts import (INSPIRATION_POEM_PROMPT,
                             USER_POST_TEXT_DECOMPOSITION_PROMPT,
                             USER_POST_TEXT_EXPANSION_PROMPT)

load_dotenv()


async def expand_user_text(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(f"{USER_POST_TEXT_EXPANSION_PROMPT}. The data is {user_input}")
    print(response.text)
    return response.text


def text_to_image(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    models = genai.list_models()
    for model in models:
        print(
            f"Model Name: {model.name}, Supported Methods: {model.supported_generation_methods}"
        )

    # imagen = genai.ImageGenerationModel("imagen-3.0-generate-001")
    # result = imagen.generate_images(prompt="Fuzzy bunnies in my kitchen", number_of_images=4)
    # for image in result.images:
    #     print(image)

    # for image in result.images:
    # # Open and display the image using your local operating system.
    #     image._pil_image.show()


def decompose_user_text(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        f"{USER_POST_TEXT_DECOMPOSITION_PROMPT}. The data is {user_input}"
    )
    print(response.text)
    return response.text


def create_poem(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-1.5-flash-8b")
    response = model.generate_content(f"{INSPIRATION_POEM_PROMPT}. The data is {user_input}")
    print(response.text)
    return response.text