import os

import google.generativeai as genai
from dotenv import load_dotenv
from prompts import (USER_POST_TEXT_DECOMPOSITION_PROMPT,
                     USER_POST_TEXT_EXPANSION_PROMPT)

load_dotenv()


async def expand_user_text(user_input):
    # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    # model = genai.GenerativeModel("gemini-1.5-flash")
    # response = model.generate_content(f"{USER_POST_TEXT_EXPANSION_PROMPT}. The data is {user_input}")
    # print(response.text)
    # return response.text
    return "The victim is facing an imminent threat from her estranged husband, John Doe, who has previously assaulted her and has now made credible threats against her life. She is currently in hiding at a friend’s residence, but fears for her safety due to John Doe’s persistence and the severity of his threats. This is a repeated pattern of abuse with a significant risk of escalation, as witnesses can confirm prior incidents of physical assault. Immediate intervention by law enforcement is crucial to prevent further harm and ensure the victim’s safety. Please dispatch officers to the location as quickly as possible and contact the victim at the number provided."


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
