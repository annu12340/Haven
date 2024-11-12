import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


def generate_text_embedding(text):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    response = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
        task_type="retrieval_document",
        title="Embedding of culprit info",
    )
    return response["embedding"]


def calculate_similarity_percentage(query_vector, result_vector):
    # Calculate Euclidean distance manually
    distance = sum((q - r) ** 2 for q, r in zip(query_vector, result_vector)) ** 0.5

    # Estimate a maximum possible distance for normalization, e.g., sqrt(768) for 768-dimensional vectors
    max_distance = len(query_vector) ** 0.5

    # Convert distance to a similarity percentage
    similarity_percentage = max(0, (1 - distance / max_distance) * 100)
    return round(similarity_percentage, 2)


def find_top_matches(
    collection, description_embedding, num_results=1, num_candidates=100
):
    # Perform a vector search to get the top matches
    results_cursor = collection.aggregate(
        [
            {
                "$vectorSearch": {
                    "path": "culprit_embedding",
                    "index": "culpritIndex2",
                    "queryVector": description_embedding,
                    "numResults": num_results,
                    "numCandidates": num_candidates,  # Required for approximate search
                    "numDimensions": 768,  # Specify the dimensionality of the embedding
                    "similarity": "euclidean",  # Specify similarity metric
                    "type": "knn",  # Use "knn" for nearest-neighbor search
                    "limit": num_results,  # Set the limit parameter
                },
            },
            {
                "$project": {
                    "culprit": 1,  # Replace with the field that contains associated text
                    "culprit_embedding": 1,  # Include embedding only if needed
                    "_id": 1,  # Include the document ID if useful
                }
            },
        ]
    )

    # Convert the cursor to a list to access the results
    results = list(results_cursor)

    return results
