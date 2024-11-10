import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()

def generate_text_embedding(text):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    try:
        response = genai.embed_content(
            model="models/text-embedding-004",
            content=text,
            title="Embedding of culprit information"
        )
        return str(response['embedding'])
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return None
