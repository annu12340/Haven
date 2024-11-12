import re


def extract_info(text):
    # Define regex pattern to extract key-value pairs
    pattern = r"(\d+)\.\s*(.*?):\s*(.*)"

    # Find all matches
    matches = re.findall(pattern, text)

    # Convert to dictionary
    data_dict = {key.strip(): value.strip() for _, key, value in matches}

    return data_dict
