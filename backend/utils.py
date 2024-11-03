import os
import google.generativeai as genai
from dotenv import load_dotenv
from PIL import Image


from prompts import USER_POST_TEXT_EXPANSION_PROMPT

load_dotenv()

async def expand_user_text(user_input):
    # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    # model = genai.GenerativeModel("gemini-1.5-flash")
    # response = model.generate_content(f"{USER_POST_TEXT_EXPANSION_PROMPT}. The data is {user_input}")
    # print(response.text)
    # return response.text
    return "The victim is facing an imminent threat from her estranged husband, John Doe, who has previously assaulted her and has now made credible threats against her life. She is currently in hiding at a friend’s residence, but fears for her safety due to John Doe’s persistence and the severity of his threats. This is a repeated pattern of abuse with a significant risk of escalation, as witnesses can confirm prior incidents of physical assault. Immediate intervention by law enforcement is crucial to prevent further harm and ensure the victim’s safety. Please dispatch officers to the location as quickly as possible and contact the victim at the number provided."



async def text_to_image(user_input):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    models = genai.list_models()
    for model in models:
        print(f"Model Name: {model.name}, Supported Methods: {model.supported_generation_methods}")

    # imagen = genai.ImageGenerationModel("imagen-3.0-generate-001")
    # result = imagen.generate_images(prompt="Fuzzy bunnies in my kitchen", number_of_images=4)
    # for image in result.images:
    #     print(image)



    # for image in result.images:
    # # Open and display the image using your local operating system.
    #     image._pil_image.show()


def encode_text_in_image(image: Image.Image, text: str) -> Image.Image:
    """
    Encodes text into the image using LSB steganography on the RGB values.
    """
    # Convert text to binary
    binary_text = ''.join(format(ord(char), '08b') for char in text) + '1111111111111110'  # End marker

    pixels = image.load()  # Access pixels
    width, height = image.size
    binary_index = 0

    for y in range(height):
        for x in range(width):
            if binary_index < len(binary_text):
                r, g, b = pixels[x, y]
                r = (r & ~1) | int(binary_text[binary_index])  # Change LSB of red channel
                pixels[x, y] = (r, g, b)
                binary_index += 1
            else:
                return image
    return image

def decode_text_from_image(image: Image.Image) -> str:
    """
    Decodes text from the image using LSB steganography on the RGB values.
    """
    binary_text = ""
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            r, _, _ = pixels[x, y]
            binary_text += str(r & 1)  # Extract LSB of red channel

            # Check for end marker
            if binary_text[-16:] == '1111111111111110':
                binary_text = binary_text[:-16]  # Remove end marker
                decoded_text = ''.join(chr(int(binary_text[i:i+8], 2)) for i in range(0, len(binary_text), 8))
                return decoded_text
    return ""