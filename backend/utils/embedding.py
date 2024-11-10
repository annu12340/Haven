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
    title="Embedding of culprit info")
    return response['embedding']


def find_top_matches(collection,description_embedding, num_results=1, num_candidates=100):
    # Perform a vector search to get the top matches
    results = collection.aggregate([
        {
            "$vectorSearch": {
                "path": "culprit_embedding",
                 "index": "culpritIndex2",
                  "queryVector": description_embedding,

                "numResults": num_results,
                "numCandidates": num_candidates,   # Required for approximate search
                "numDimensions": 768,              # Specify the dimensionality of the embedding
                "similarity": "euclidean",         # Specify similarity metric
                "type": "knn",                     # Use "knn" for nearest-neighbor search
                "limit": num_results               # Set the limit parameter
            },

        },     {
            "$project": {
                "culprit": 1,  # Replace with the field that contains associated text
                "culprit_embedding": 1,    # Include embedding only if needed
                "_id": 1                   # Include the document ID if useful
            }
        }

    ])
    # print(f"the top match is {list(results)}")
    # Convert results to a list and return
    return list(results)
