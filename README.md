# Haven - Empowering Women in Silence

## Inspiration 🌟
Imagine a woman trapped in silence, enduring daily fear and abuse, unable to seek help because her every move is monitored. For millions of women worldwide, this is a daily reality.
Haven is an innovative 🌐 AI-powered solution designed to empower women in abusive situations by providing discreet ways to seek help, access mental health support, and receive legal guidance—without the risk of exposure.

## What it Does 💡

Problem Statement

Globally, 1 in 3 women experiences physical or sexual violence in her lifetime, often by an intimate partner. In India, 30% of women have faced domestic violence at least once (WHO, National Family Health Survey). Abusers often control and monitor digital communications, isolating these women and preventing them from safely reaching out for help.

Haven’s Solution 💪
- Discreet SOS Messaging through Steganography
Women in abusive relationships are often unable to directly call out for help. Social media profiles and call histories are under constant surveillance by their abuser, making it difficult to seek assistance openly.
Our Solution: Haven utilizes steganography to encode discreet distress messages within seemingly innocent images, allowing women to communicate in plain sight, without arousing suspicion.

- AI Avatar for Mental Health Support
Many survivors endure their struggles in silence, with only 10% seeking mental health support.
Our Solution: A compassionate AI chatbot provides confidential support, offering personalized coping strategies and resources, especially important as women experiencing abuse are 80% more likely to face mental health challenges.

- Law Bot with Knowledge of Legal Rights
In India, only 14% of women have access to formal legal support. Haven’s Law Bot helps change this by providing instant, confidential guidance on abuse cases, custody battles, and property claims.
Our Solution: Trained on the Indian constitution and other legal documents, the bot helps women gain the confidence to advocate for their rights, making legal support accessible to all.

## How to set it up in local

**Prerequisite** 
-  We require a mongo db cluster, Gemini API l=key, groq API key, clerk key, elevenlabs key AWS configs


### **Backend**
- Create virtual env and activate it
```
python -m venv .venv
.\.venv\Scripts\Activate (in windows)
```

- Install the necessary dependencies from the requirements.txt file:
```
pip install -r backend/requirements.txt
```

- Add the required keys in .env file
```
MONGO_ENDPOINT=
GEMINI_API_KEY=
GROQ_API_TOKEN=g
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
S3_BUCKET_NAME=
```

- Run the FastAPI Server Locally
```
fastapi dev backend/main.py

or

uvicorn backend.main:app --reload
```
Then open http://127.0.0.1:8000/docs to see the endpoints

### **Frontend**
- Install the required pacakges
```
npm install
```

- Start the application
```
npm run dev
```
Then open http://localhost:3000/ to see the application

- Add the keys in .env.local
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
GOOGLE_API_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
