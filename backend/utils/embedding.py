import google.generativeai as genai
from dotenv import load_dotenv
import os


load_dotenv()

def generate_text_embedding(text):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    response=genai.embed_content(
    model="models/text-embedding-004",
    content=text,
    task_type="retrieval_document",
    title="Embedding of single string")
    return str(response['embedding'])
