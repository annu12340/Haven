<div align="center">

# Haven  
*A Silent Shield, A Strong Voice.*

</div>


### Inspiration 🌟
Imagine a woman trapped in silence, enduring daily fear and abuse, unable to seek help because her every move is monitored. For millions of women worldwide, this is a daily reality.  
**Haven** is an innovative 🌐 AI-powered solution designed to empower women in abusive situations by providing discreet ways to seek help, access mental health support, and receive legal guidance—without the risk of exposure.

### DEMO VIDEO:
https://www.youtube.com/watch?v=qxb3891TGzw 

### Try it out
https://haven-aws.framer.website/

<br/>

## What it Does 💡

### Problem Statement 
Globally, **1 in 3 women** experiences physical or sexual violence in her lifetime, often by an intimate partner. In India, **30% of women** have faced domestic violence at least once (WHO, National Family Health Survey). Abusers often control and monitor digital communications, isolating these women and preventing them from safely reaching out for help.

### Haven’s Solution 💪

- **Discreet SOS Messaging through Steganography**  
  Women in abusive relationships are often unable to directly call out for help. Social media profiles and call histories are under constant surveillance by their abuser, making it difficult to seek assistance openly.  
   *Our Solution:* Haven utilizes steganography to encode discreet distress messages within seemingly innocent images, allowing women to communicate in plain sight, without arousing suspicion.

- **AI Avatar for Mental Health Support**  
  Many survivors endure their struggles in silence, with only **10%** seeking mental health support.  
   *Our Solution:* A compassionate AI chatbot provides confidential support, offering personalized coping strategies and resources, especially important as women experiencing abuse are **80%** more likely to face mental health challenges.

- **Law Bot with Knowledge of Legal Rights**  
  In India, only **14% of women** have access to formal legal support. Haven’s Law Bot helps change this by providing instant, confidential guidance on abuse cases, custody battles, and property claims.  
   *Our Solution:* Trained on the Indian constitution and other legal documents, the bot helps women gain the confidence to advocate for their rights, making legal support accessible to all.

---

## Detailed Description 📝

### 1. Discreet SOS Messaging through Steganography
For many women in abusive relationships who live under constant monitoring, finding a way to ask for help without alerting their abusers is critical. Haven introduces a revolutionary SOS messaging system, using **steganography** to encode distress signals within innocent-looking images, like flowers or landscapes.

### How it Works 🛠️

On the user side, Haven’s process begins with message generation, where the user enters brief details of their situation. Our LLM expands these inputs into complete, coherent sentences. The user then chooses an image prompt, like a flower or landscape, which the AI generates and encodes with the distress message through steganography. Once complete, the user shares this seemingly ordinary image on social media, where it appears innocuous to others, including any abusers monitoring the profile.

On the authority side, Haven's system continuously monitors social media for SOS images tagged with specific hashtags. Once detected, these images are decoded to extract the hidden message using reverse steganography. The decoded text is then broken down into structured segments for efficient analysis, after which it is stored in MongoDB, where cases are organized by severity level to prioritize urgent responses.


![alt](https://i.ibb.co/LS6195k/napkin-selection-3.png)


![alt](https://i.ibb.co/X2GTbYc/napkin-selection-4.png)

### What Sets Haven Apart 🌠

- **Fast and Simple Communication:** Women in high-stress situations can quickly type keywords; our AI generates a full distress message, reducing time and risk.
- **Innovative Steganography Approach:** Hidden messages within everyday photos ensure total privacy from abusers, making the post appear harmless while alerting authorities.
- **Overcoming Unreliable Channels:** Many government websites are inaccessible due to technical issues or restrictions. Haven provides a reliable, always-accessible option to seek help, bypassing these barriers.


### Technical Details 

| API Route            | Description                                                 |
|----------------------|-------------------------------------------------------------|
| `/text-generation`   | Expands user input via AWS Bedrock                        |
| `/img-generation`    | Generates an image from the user’s prompt                   |
| `/encode`            | Encodes text into the generated image                       |
| `/decode`            | Decodes text from the image                                 |
| `/text-decomposition`| Decomposes the decoded text into structured sections        |
| `/save-extracted-data` | Saves the structured data in MongoDB                       |

**Working**
**User Side**  
- Message Generation When the user inputs basic information about their situation, the LLM leverages this data to create syntactically complete, contextually relevant sentences that represent the user’s distress message.
- Image Creation The user selects a theme or prompt for an image (such as “flower,” “landscape,” or “food”), which the image generation module uses to create an innocuous-looking image with the selected theme.
- Message Encoding: The generated distress message is embedded into the AI-generated image using steganography, where the textual message is concealed within pixel data in a way that is imperceptible to the naked eye. This process uses encoding algorithms that maintain the image’s visual integrity while securely embedding the message.
- Sharing: The encoded image, which appears visually harmless, can be shared publicly on social media platforms. This avoids detection from an abuser monitoring the user's activity while providing a hidden channel for SOS messages.

**Authority Side**  
- Monitoring with Cron: A cron job runs at regular intervals to monitor social media channels for specific hashtags or identifiers associated with encoded SOS images. This background job allows the system to scan and detect potential distress signals in real time.
- Image Decoding: Once an image with an encoded SOS message is detected, it undergoes reverse steganography decoding. This involves extracting the pixel-embedded message, isolating the encoded data, and reconstructing it into a readable text format.
- Text Decomposition: The decoded message is analyzed and broken down into structured data fields (e.g., urgency level, nature of the abuse) using natural language processing techniques. This decomposition facilitates the classification of the message’s severity and content type.
- Storage in MongoDB: The parsed data is stored in MongoDB in a structured format, utilizing MongoDB’s document-based architecture to facilitate efficient retrieval and querying. Data fields are indexed for real-time access, enabling authorities to prioritize cases based on urgency and ensuring streamlined incident response.

![User Flow](https://storage.googleapis.com/example-offi-1/flow.webp)


#### Culprit Similarity Matching

When an authority selects "Find Match," the system uses cosine similarity on stored embeddings to find the top N similar profiles, enabling quick connections across related cases.

**Working**
- Data Embedding: The details provided (physical traits, behaviors, etc.) are passed through an embedding model, creating a dense vector that represents the data in multi-dimensional space.
- Vector-Based Search: When a match search is triggered, a vector search is executed in MongoDB Atlas Vector Search. Cosine similarity is calculated to determine the closest matching profiles.
- Match Ranking and Filtering: Results are ranked by similarity score, allowing for threshold-based filtering to adjust for specificity.

### Impact
In a world where 60% of abused women lack private communication options, reaching out for help becomes nearly impossible. Abusers often control access to phones, messages, and the internet, trapping women in a cycle of silence and fear. Discreet SOS Messaging addresses this urgent need for a safe, covert communication channel, allowing women to reach out without fear of being caught. It’s a solution designed to break the silence when speaking out is dangerous.\
### Screenshots

**User flow**

![Alt](https://storage.googleapis.com/example-offi-1/p1.png)
![Alt text](https://storage.googleapis.com/example-offi-1/userflow2amazon.webp)
![Alt text](https://storage.googleapis.com/example-offi-1/titan%20img%20gen.webp)
![Alt text](https://storage.googleapis.com/example-offi-1/share.png)

**Authroity flow**

![Alt text](https://storage.googleapis.com/example-offi-1/admintable.webp)

![Alt text](https://storage.googleapis.com/example-offi-1/issue%20view%20admin.webp)

![Alt text](https://storage.googleapis.com/example-offi-1/culprit.webp)
---

##  **2. AI Avatar for Mental Health Support** 

For many survivors of abuse, the **psychological toll** is just as devastating as the physical harm. However, only **10%** of women experiencing domestic abuse seek mental health support, often due to fear of judgment, lack of privacy, or limited access to professional services.  
- Over **80%** of women facing abuse are at a higher risk of mental health issues such as **anxiety, depression**, and **PTSD**.  
- **Haven** aims to bridge this gap, offering an accessible, **empathetic, and private** support system for women in distress.



###  **How It Works:**

**Haven’s AI Avatar** provides **24/7 mental health support** through **confidential, non-judgmental conversations**. The avatar listens to users' concerns and offers:
- **Personalized coping strategies**  
- **Calming techniques**  
- **Relevant resources** to manage mental health, tailored specifically to the emotional needs of abuse survivors.

Whether a user experiences **panic attacks**, **emotional exhaustion**, or simply needs a safe space to express their feelings, **Haven** is always there, offering a compassionate presence when needed most. The best part? It's completely confidential—no need to worry about being overheard or judged.
![Therapy bot](https://i.ibb.co/RhhLdm9/napkin-selection-1.png)



### ✨ **What Sets It Apart:**

- **Tailored to Abuse Survivors:**  
  Unlike generic mental health apps, our AI avatar is specially trained to recognize and address the **unique psychological needs** of abuse survivors. The AI offers strategies that speak directly to the trauma of **intimate partner violence**, helping survivors manage their symptoms more effectively.

- **Personalized Conversations:**  
  By leveraging data from previous interactions, the AI avatar provides a **tailored experience**, understanding emotional states and offering more relevant support.  
  **(Data storage only with user consent)**

- **💬 Real-Time, Empathetic Conversations:**  
  The avatar uses **advanced facial expression** and **animation control** to respond empathetically, ensuring that the user feels heard and understood during every interaction.

- **24/7 Mental Health Support:**  
  Women in abusive situations may avoid traditional mental health services due to **fear of stigma** or **retaliation**. Haven’s AI avatar provides a **secure space** where users can engage freely, **anytime** and **anywhere**, without concerns about appointments or privacy.



### 🛠️ **Technical Details:**
![Image](https://storage.googleapis.com/example-offi-1/therapy%20bot%20flow%20amazon.webp)

- **Model and Animation Loading:**  
  Upon initiating the conversation, the AI fetches **3D model files** (.glb format) and **animations** to bring the avatar to life. The avatar’s **facial morph targets** and animation sequences are initialized using **useGLTF**, allowing for **human-like interactions** with empathy.

- **User Data Retrieval:**  
  When a user interacts with the AI avatar, the system retrieves relevant data from previous conversations (stored **securely in MongoDB**) to offer a **personalized experience**. This enables the AI to understand the user’s emotional state, preferences, and history, ensuring continuity in support.

- **Natural Language Understanding:**  
  The AI uses a **Large Language Model (LLM)**, such as **Gemini**, to process the user’s input, understanding the **context**, **emotional tone**, and **urgency**. It then generates responses with **personalized coping strategies**, **calming techniques**, and other **mental health resources**.

- **Audio Generation and Lip-Sync:**  
  The AI’s responses are converted into **natural-sounding speech** using **ElevenLabs**’ **Text-to-Speech (TTS)** technology. The audio is base64-encoded, and synchronized with the avatar’s **lip movements**, ensuring **realistic lip-syncing**.

- **Facial Expression Mapping:**  
  **Titan Text G1 - Express** provides specific cues (e.g., **smiling**, **frowning**) that are mapped to the avatar’s morph targets. This allows the avatar to show appropriate **emotional expressions**, reflecting the user’s emotions such as **fear**, **sadness**, or **relief**.

- **Animation Management:**  
  The avatar transitions smoothly between different **animations** (e.g., from **Idle** to **Talking**), making the interaction feel natural and **engaging**, reinforcing the emotional tone of the conversation.


### Screenshots

![Alt text](https://storage.googleapis.com/example-offi-1/therapy%20bot.webp)


---

## **3. Law Bot for Legal Empowerment**

Haven is not just about providing immediate emotional and physical safety—it’s about **empowering women** with the knowledge of their legal rights . Our **law bot**, equipped with an in-depth understanding of the Indian Constitution (and expanding to global legal frameworks ), provides **instant guidance** on abuse cases, custody disputes, and property claims, enabling women to navigate the complex legal landscape with confidence .

In many parts of the world, only 14% of women have access to formal legal assistance , often due to cultural barriers, financial constraints, or lack of awareness. Haven aims to bridge this critical gap by offering **free, accessible legal guidance** at their fingertips 

### **How It Works: 🤖**

Haven’s law bot is designed to provide **clear, understandable** information on a wide range of legal issues, tailored to the user’s unique situation . Women in need can simply ask the bot questions related to **abuse**, **divorce**, **child custody**, **property rights**, or other legal concerns, and receive instant, easy-to-understand responses based on national and international laws 

![Law Bot Image](https://i.ibb.co/cXR59by/napkin-selection-2.png)


### **What Sets It Apart: 💡**

- **Accessible, On-Demand Legal Support:** Unlike traditional legal systems where waiting for an appointment or expensive consultations can delay action, the Haven law bot is available 24/7 to provide **immediate legal advice** 🕒. Women no longer have to wait to understand their rights or options; the bot offers quick, reliable answers to legal queries at any time.
  
- **Global Reach & Customizable to Local Laws:** Haven’s law bot is designed to adapt to various countries' laws . Whether users are in **India**, the **US**, or beyond, they will receive information specific to their region's legal framework, ensuring the advice is **relevant** and **applicable** to their situation.

- **Empowerment Through Knowledge:** Legal systems can often feel intimidating or inaccessible, especially for women facing abuse or discrimination. By providing easy access to legal resources, Haven empowers women to take **informed action**. It helps them advocate for their rights, pursue justice, and better understand the complexities of legal processes 

### **Technical Details 🛠️**
![Law Bot Image](https://storage.googleapis.com/example-offi-1/law%20bot%20tech.webp)

**Preprocessing Phase (Document Embedding Preparation) :**
1. Collect legal documents, such as the Indian Constitution and related statutes 
2. Convert these documents into chunks if they are lengthy, ensuring each chunk captures meaningful information.
3. Pass each chunk through a vector embedding model (e.g., Sentence Transformers or Gemini/Vertex AI) to generate **dense vector representations**.
4. Store each vector embedding along with its associated text chunk in **MongoDB**, utilizing the vector storage capabilities (e.g., **MongoDB Atlas Vector Search**) for efficient retrieval.

**User Interaction Phase (Real-Time) :**
1. Receive the user’s question or legal query input 
2. Convert the user query into a **vector embedding** using the same embedding model to ensure compatibility with the stored embeddings.

**Vector Search and Retrieval :**
1. Conduct a vector similarity search in **MongoDB**, using the user query embedding to retrieve the most relevant document chunks.
2. Retrieve the top N most similar document chunks based on cosine similarity or another distance metric, ranked by relevance.

**Response Generation :**
1. Aggregate the retrieved document chunks and pass them to an **LLM** (e.g., Titan Text G1 - Express or a fine-tuned model) via the /text-generation API.
2. The LLM synthesizes a coherent and **legally sound** response based on the retrieved information.

**Bot Response :**
1. Present the generated response to the user in a **conversational format**.
2. Optionally, provide additional options for the user to ask follow-up questions or receive more detailed legal explanations.


### Screenshot

![Law Bot Image](https://storage.googleapis.com/example-offi-1/law%20bot.webp)

![Law Bot Image](https://storage.googleapis.com/example-offi-1/lawbot%20res.webp)

### **Impact**

The law bot provides **immediate access** to legal knowledge, which can be a **game-changer** for women who otherwise might not know their rights or how to protect themselves . By offering **timely legal insights**, women can make more informed decisions about their safety, custody battles, or financial security, ultimately empowering them to take **control** of their lives 

---

### **How We Built It 🔧**

#### **Backend :**
- **Python 3.12 + FastAPI API development** 
- **Amazon Bedrock**: For text and embedding generation 
- **Amazon S3**: For Storage
- **Pymongo**: MongoDB connection 
- **Groq**: Fast AI Inference engine  that uses Gemma model
- **Pydantic**: Data modeling and validation 
- **Pypdf**: For formatting pdf documents
- **Black**: Linter and code formatter together with pr
- **Pillow**: For image manipulation during pre-commit hooks
- **MongoDB Atlas search**: For searching across vector embedding


#### **Frontend :**
- **Next.js** as the frontend framework 
- **Tailwind CSS** for styling 
- **Elevenlabs** for natual sounding text to speech generation
- **GLTF** (graphics library transmission format) for rendering 3D images on web
- **Amazon Bedrock** and **boto3**: For LLM inference
- **Clerk**: For authentication
- **Typescript**: Create functional components

#### **Deployment**
- **Render** for backend deployment 
- **Vercel** for frontend deployment 


## How to set it up in local

**Prerequisite**

- We require a mongo db cluster, Gemini API l=key, groq API key, clerk key, elevenlabs key AWS configs

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


---

### **Where MongoDB is used 🤖:**
- Used as db for distress sos message and for saving culprit info & embedding
![Law Bot Image](https://storage.googleapis.com/example-offi-1/mongo.webp)


- Used as a vector store for legal documents. The law chatbot uses this for its custom knowledge base
![Law Bot Image](https://storage.googleapis.com/example-offi-1/docembeddeing.webp)

- If user permits, save important details from their therapy session into db so that the therapy bot has more context
![Law Bot Image](https://storage.googleapis.com/example-offi-1/therapy%20info.webp)

The mongo instance is running on AWS
![Law Bot Image](https://storage.googleapis.com/example-offi-1/mongo%20on%20aws.webp)

### **How AI Is Used Throughout the Project 🤖:**

**(Category: Best Use of Amazon Bedrock)**

- Text Generation and Text Expansion ✍️

  - AI powers Haven's ability to transform brief, incomplete messages into coherent, full distress signals. Through Large Language Models (LLMs) like Titan Text G1 - Express, Haven expands user input, turning simple keywords or short phrases into comprehensive messages. This is essential in high-stress situations where a woman may not have the time or mental clarity to articulate her circumstances in full. The model ensures that the message accurately represents the severity of the situation while still being discreet.
  - Example: If a user types “help, scared, locked in room,” the AI expands it into a full message like: "I am trapped in my room, scared and unable to leave. Please help me." This message is then encoded in an image to be shared safely.
  - Using **Titan Text G1 - Express** LLM model

- Culprit matching
    - When a user reports a distress situation, details about the culprit's physical and behavioral characteristics are embedded as vector representations. These embeddings capture nuanced details about the individual, creating a unique profile that is stored in MongoDB’s vector database.
   - Similarity Search with Cosine Similarity:
    When an authority initiates a search by selecting "Find Match," the system performs a cosine similarity operation on the stored embeddings. By comparing the incoming profile with existing data, the system identifies top N matches based on similarity scores, allowing authorities to see connections across reported cases.
  - Using **Titan Text G1 - Express** LLM model

- AI-Powered Poem Generation 📝

  - In moments of emotional distress, sometimes the simplest words can bring comfort. Haven's AI-Powered Poem Generator provides empowering, reassuring poems designed to remind women that help is on the way and that they are not alone. The AI generates short, encouraging poems based on the user's emotional state or current needs. These poems are designed to provide emotional support and the assurance that change is possible.
  - Using **Titan Text G1 - Express** LLM model

- AI to Detect Severity of Situations 🚨

  - The LLM processes large text inputs and sorts them based on the severity and nature of the abuse, making it easier for authorities to quickly take action without reading through long descriptions. 

- Image Generation 🖼️

  - AI is used to create custom images based on user input, such as landscapes, flowers, or everyday objects. This enables the use of steganography—embedding distress messages within the images. These generated images appear completely innocent to outsiders, while secretly containing encoded help requests.
  - Example: A user may select an image of a flower. The AI embeds a distress message, which looks like a normal social media post but contains a hidden cry for help when decoded.
  - Using **Titan Image Generator VI** LLM model

- AI-Powered Law Bot for Legal Support ⚖️

  - Haven’s Law Bot leverages AI to offer instant, confidential legal guidance. Trained on a vast array of legal resources—including national constitutions, local laws, and case precedents—the AI provides women with easy-to-understand answers to their legal questions, empowering them to take control of their situations. The Law Bot breaks down complex legal jargon into simple language, ensuring clarity and accessibility.
  - Example: A user can ask, "What should I do if my spouse is abusing me?" and the Law Bot will provide a clear step-by-step answer based on the relevant legal rights, such as filing a complaint or seeking a restraining order. 
  - Using **Titan Text G1 - Express** LLM model

- Therapy Bot for Mental Health Support 💬

  - Haven’s Therapy Bot uses AI to provide personalized mental health support. This bot offers coping strategies, emotional support, and mindfulness exercises to help women manage anxiety, depression, and PTSD. By analyzing the user's input, the AI tailors its responses to the emotional state of the user, ensuring relevant advice is given in real-time.
  - Example: If a user is feeling anxious, the Therapy Bot may suggest breathing exercises, a grounding technique, or offer calming affirmations to reduce stress.
  - Using **Titan Text G1 - Express** LLM model


- Vector Embedding for Personalized Experience 🧠

  - To make interactions with the AI more personalized and contextually aware, vector embeddings are used to store and retrieve information. For each user, key data points (like their emotional state, past conversations, and preferences) are stored in MongoDB using embeddings generated from AI models like Sentence Transformers. This allows the AI to provide more informed responses over time.
  - Example: The AI can remember past interactions, such as a user’s previous emotional states or preferred coping strategies. This personalized knowledge allows the AI to provide more targeted advice, improving the support it offers over time.
  -  Using **Titan Text G1 - Express** LLM model and **LangChain for embedding**


### **How Atlas Vector Search Is Used in the Project 🤖:**

**(Category: Best Use of Atlas Vector Search)**

Atlas Vector Search is leveraged in this project to efficiently search and match perpetrators based on previously stored data embeddings, enabling quick identification of repeat offenders. The use of Atlas Vector Search allows authorities to find the closest matches for a given suspect profile based on various characteristics, such as physical and behavioral features, stored as vector embeddings

```
    results_cursor = collection.aggregate(
        [
            {
                "$vectorSearch": {
                    "path": "culprit_embedding",
                    "index": "culpritIndex",
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
```
Key Benefits:

- Speed: Atlas Vector Search accelerates the process of finding similar offenders, providing authorities with actionable data quickly.

- Scalability: As the dataset grows, Atlas Vector Search scales seamlessly, allowing the system to handle an increasing number of reports and embeddings.

- Accuracy: By using cosine similarity and nearest-neighbor search techniques, the system ensures accurate and relevant matches, even when dealing with complex or subtle variations in the described characteristics.

### How Langchain Is Used in the Project

LangChain allows efficient processing of large PDFs by recursively splitting them into smaller, manageable chunks and converting them into embeddings for further analysis or search.

- Recursive PDF Splitting: LangChain’s PDFReader extracts text from PDFs, and the RecursiveCharacterTextSplitter splits the content into smaller sections based on size or logical breaks (e.g., paragraphs, chapters), ensuring that each chunk fits within token limits for embedding generation.
- Embedding Generation: After splitting the text, LangChain uses embedding models (e.g., OpenAI Embeddings) to convert each chunk into a vector representation. These embeddings capture the semantic meaning of the text and can be stored in a vector database for similarity searches.

