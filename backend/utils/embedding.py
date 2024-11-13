import json
import os

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


def generate_text_embedding(bedrock_client, text):
    model_id = "amazon.titan-embed-text-v2:0"

    native_request = {"inputText": text}

    # Convert the native request to JSON.
    request = json.dumps(native_request)

    # Invoke the model with the request.
    response = bedrock_client.invoke_model(modelId=model_id, body=request)

    # Decode the model's native response body.
    model_response = json.loads(response["body"].read())

    # Extract and print the generated embedding and the input text token count.
    embedding = model_response["embedding"]
    return embedding


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
