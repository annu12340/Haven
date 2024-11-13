import os

import google.generativeai as genai
from dotenv import load_dotenv
from groq import Groq

from backend.prompts import (INSPIRATION_POEM_PROMPT,
                             USER_POST_TEXT_DECOMPOSITION_PROMPT,
                             USER_POST_TEXT_EXPANSION_PROMPT)

load_dotenv()



async def expand_user_text_using_bedrock(bedrock_runtime, user_input):
    # Define the model ID to be used in the request.
    model_id = 'amazon.titan-text-express-v1'

    # Create the conversation structure with the user's input.
    conversation = [
        {
            "role": "user",
            "content": [    f"{USER_POST_TEXT_EXPANSION_PROMPT}. The data is {user_input}"],
        }
    ]

    try:
        # Send the conversation to the model using Bedrock's inference configuration.
        response = bedrock_runtime.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={
                "maxTokens": 512,
                "temperature": 0.5,
                "topP": 0.9
            }
        )

        # Extract and print the response text from the model's output.
        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
        return response_text

    except Exception as e:
        # Log the error if the model invocation fails.
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        exit(1)



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


def decompose_user_text(bedrock_runtime, user_input):
    # Define the model ID to be used in the request.
    model_id = 'amazon.titan-text-express-v1'

    # Create the conversation structure with the user's input.
    conversation = [
        {
            "role": "user",
            "content": [   f"{USER_POST_TEXT_DECOMPOSITION_PROMPT}. The data is {user_input}"],
        }
    ]

    try:
        # Send the conversation to the model using Bedrock's inference configuration.
        response = bedrock_runtime.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={
                "maxTokens": 512,
                "temperature": 0.4,
                "topP": 0.8
            }
        )

        # Extract and print the response text from the model's output.
        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
        return response_text

    except Exception as e:
        # Log the error if the model invocation fails.
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        exit(1)




def create_poem(bedrock_runtime, user_input):
        # Define the model ID to be used in the request.
    model_id = 'amazon.titan-text-express-v1'

    # Create the conversation structure with the user's input.
    conversation = [
        {
            "role": "user",
            "content": [ f"{INSPIRATION_POEM_PROMPT}. The data is {user_input}"],
        }
    ]

    try:
        # Send the conversation to the model using Bedrock's inference configuration.
        response = bedrock_runtime.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={
                "maxTokens": 512,
                "temperature": 0.8,
                "topP": 0.99
            }
        )

        # Extract and print the response text from the model's output.
        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
        return response_text

    except Exception as e:
        # Log the error if the model invocation fails.
        print(f"ERROR: Can't invoke '{model_id}'. Reason: {e}")
        exit(1)

    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    model = genai.GenerativeModel("gemini-1.5-flash-8b")
    response = model.generate_content(

    )
    print(response.text)
    return response.text
