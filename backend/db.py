import os
import pickle

from bson import Binary
from dotenv import load_dotenv
from pymongo import MongoClient
# Load environment variables
from pymongo.operations import SearchIndexModel

from backend.utils.embedding import generate_text_embedding

load_dotenv()
print("MONGO_ENDPOINT:", os.getenv("MONGO_ENDPOINT"))

# Initialize db_client as None globally to cache the connection
db_client = None


def get_database():
    """
    Connect to the MongoDB database. Caches the connection so that it is reused
    across multiple calls, improving performance by avoiding repeated handshakes.
    """
    global db_client
    if db_client is None:
        try:
            # Create a single MongoClient instance
            db_client = MongoClient(os.getenv("MONGO_ENDPOINT"))
            print("Database connection established.")
        except Exception as e:
            print("Error connecting to the database:", e)
            return None
    return db_client["SheBuilds"]


def insert_data_into_db(
    name, location, contact_info, severity, culprit, relationship_to_culprit, other_info
):
    """
    Inserts a document into the 'posts' collection of the MongoDB database.
    Reuses the cached database connection.
    """
    db = get_database()
    if db is None:
        print("Database connection is not available.")
        return None

    collection = db["complains2"]
    document = {
        "name": name,
        "location": location,
        "contact_info": contact_info,
        "severity": severity,
        "culprit": culprit,
        "relationship_to_culprit": relationship_to_culprit,
        "other_info": other_info,
        "status": "Pending",
    }
    culprit_embedding = generate_text_embedding(culprit)
    document["culprit_embedding"] = culprit_embedding
    try:
        # Insert the document into the collection
        result = collection.insert_one(document)
        print(f"Inserted document with ID: {result.inserted_id}")
        return result.inserted_id
    except Exception as e:
        print("Error inserting data:", e)
        return None


# culprit='a black eyed women who is bald'
# insert_data_into_db('name', 'location', '', '', culprit, 'husband', '')
# # insert sample data into the database with some random location as {lat, lng}
# insert_data_into_db("Alice", {"lat": 37.7749, "lng": -122.4194}, "High", "Broken window", "Needs urgent repair")
# insert_data_into_db("Bob", {"lat": 37.7749, "lng": -122.4194}, "Low", "Leaky faucet", "Minor issue")
# insert_data_into_db("Charlie", {"lat": 37.7749, "lng": -122.4194}, "Medium", "Faulty wiring", "Needs inspection")


# Function to upload embeddings to MongoDB
def upload_embeddings_to_mongo(file_contents):
    db = get_database()
    collection = db["doc_embedding"]
    for filename, content in file_contents:
        # Generate embeddings for the document content
        embedding = generate_text_embedding(content)

        # Prepare the document to insert into MongoDB
        doc = {
            "filename": filename,
            "embedding": Binary(pickle.dumps(embedding)),  # Store as a binary object
            "content": content[
                :500
            ],  # Store the first 500 characters of the content for preview
        }

        # Insert the document into the MongoDB collection
        collection.insert_one(doc)
        print(f"Uploaded {filename} to MongoDB.")
