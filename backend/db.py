from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
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

def insert_data_into_db(name, location, severity, issue, other_info):
    """
    Inserts a document into the 'posts' collection of the MongoDB database.
    Reuses the cached database connection.
    """
    db = get_database()
    if db is None:
        print("Database connection is not available.")
        return None

    collection = db["posts"]
    document = {
        "name": name,
        "location": location,
        "severity": severity,
        "issue": issue,
        "other_info": other_info,
    }

    try:
        # Insert the document into the collection
        result = collection.insert_one(document)
        print(f"Inserted document with ID: {result.inserted_id}")
        return result.inserted_id
    except Exception as e:
        print("Error inserting data:", e)
        return None

# # insert sample data into the database with some random location as {lat, lng}
# insert_data_into_db("Alice", {"lat": 37.7749, "lng": -122.4194}, "High", "Broken window", "Needs urgent repair")    
# insert_data_into_db("Bob", {"lat": 37.7749, "lng": -122.4194}, "Low", "Leaky faucet", "Minor issue")    
# insert_data_into_db("Charlie", {"lat": 37.7749, "lng": -122.4194}, "Medium", "Faulty wiring", "Needs inspection")