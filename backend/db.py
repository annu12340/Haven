from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def get_database():
    # Replace 'your_connection_string' with your MongoDB URI
    client = MongoClient(os.getenv("MONGO_ENDPOINT"))
    db = client["SheBuilds"]
    return db


def insert_data_into_db(name, location, severity, issue, other_info):
    db = get_database()
    # Specify the collection name
    collection = db["posts"]  # Replace with your collection name

    # Create a document to insert
    document = {
        "name": name,
        "location": location,
        "severity": severity,
        "issue": issue,
        "other_info": other_info,
    }

    # Insert the document into the collection
    result = collection.insert_one(document)
    return result.inserted_id
