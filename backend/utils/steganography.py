import requests
from PIL import Image


def encode_text_in_image(image: Image.Image, text: str) -> Image.Image:
    """
    Encodes text into the image using LSB steganography on the RGB values.
    """
    # Convert image to RGB if it's in a different mode
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")

    encoded_image = image.copy()
    binary_text = (
        "".join(format(ord(char), "08b") for char in text) + "1111111111111110"
    )  # End marker
    pixels = encoded_image.load()
    width, height = encoded_image.size
    idx = 0

    for y in range(height):
        for x in range(width):
            if idx < len(binary_text):
                # Get pixel values
                pixel = pixels[x, y]

                # Handle RGB and RGBA formats
                if image.mode == "RGBA":
                    r, g, b, a = pixel
                else:
                    r, g, b = pixel
                    a = None

                # Modify LSB of the red channel
                r = (r & ~1) | int(binary_text[idx])  # Modify LSB of red channel
                idx += 1

                # Set modified pixel back
                if a is not None:
                    pixels[x, y] = (r, g, b, a)
                else:
                    pixels[x, y] = (r, g, b)
            else:
                break
    return encoded_image


def decode_text_from_image(image: Image.Image) -> str:
    """
    Decodes text from the image using LSB steganography on the RGB values.
    """
    # Convert the image to RGB if it's not in RGB or RGBA
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")

    binary_text = ""
    pixels = image.load()
    width, height = image.size

    for y in range(height):
        for x in range(width):
            # Handle both RGB and RGBA pixel formats
            pixel = pixels[x, y]
            if image.mode == "RGBA":
                r, g, b, a = pixel
            else:
                r, g, b = pixel

            # Extract the LSB of the red channel
            binary_text += str(r & 1)

            # Check for end marker
            if binary_text[-16:] == "1111111111111110":
                binary_text = binary_text[:-16]  # Remove end marker
                decoded_text = "".join(
                    chr(int(binary_text[i : i + 8], 2))
                    for i in range(0, len(binary_text), 8)
                )
                return decoded_text

    # If no end marker is found, return an empty string
    return ""
