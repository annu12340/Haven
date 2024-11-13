# Haven - Empowering Women in Silence

## Inspiration 🌟

Imagine a woman trapped in silence, enduring daily fear and abuse, unable to seek help because her every move is monitored. For millions of women worldwide, this is a daily reality.  
**Haven** is an innovative 🌐 AI-powered solution designed to empower women in abusive situations by providing discreet ways to seek help, access mental health support, and receive legal guidance—without the risk of exposure.

---

## What it Does 💡

### Problem Statement

Globally, **1 in 3 women** experiences physical or sexual violence in her lifetime, often by an intimate partner. In India, **30% of women** have faced domestic violence at least once (WHO, National Family Health Survey). Abusers often control and monitor digital communications, isolating these women and preventing them from safely reaching out for help.

### Haven’s Solution 💪

- **Discreet SOS Messaging through Steganography**  
  Women in abusive relationships are often unable to directly call out for help. Social media profiles and call histories are under constant surveillance by their abuser, making it difficult to seek assistance openly.  
   _Our Solution:_ Haven utilizes steganography to encode discreet distress messages within seemingly innocent images, allowing women to communicate in plain sight, without arousing suspicion.

- **AI Avatar for Mental Health Support**  
  Many survivors endure their struggles in silence, with only **10%** seeking mental health support.  
   _Our Solution:_ A compassionate AI chatbot provides confidential support, offering personalized coping strategies and resources, especially important as women experiencing abuse are **80%** more likely to face mental health challenges.

- **Law Bot with Knowledge of Legal Rights**  
  In India, only **14% of women** have access to formal legal support. Haven’s Law Bot helps change this by providing instant, confidential guidance on abuse cases, custody battles, and property claims.  
   _Our Solution:_ Trained on the Indian constitution and other legal documents, the bot helps women gain the confidence to advocate for their rights, making legal support accessible to all.

---

## Detailed Description 📝

### 1. Discreet SOS Messaging through Steganography

For many women in abusive relationships who live under constant monitoring, finding a way to ask for help without alerting their abusers is critical. Haven introduces a revolutionary SOS messaging system, using **steganography** to encode distress signals within innocent-looking images, like flowers or landscapes.

### How it Works 🛠️

On the user side, Haven’s process begins with message generation, where the user enters brief details of their situation. Our LLM expands these inputs into complete, coherent sentences. The user then chooses an image prompt, like a flower or landscape, which the AI generates and encodes with the distress message through steganography. Once complete, the user shares this seemingly ordinary image on social media, where it appears innocuous to others, including any abusers monitoring the profile.

On the authority side, Haven's system continuously monitors social media for SOS images tagged with specific hashtags. Once detected, these images are decoded to extract the hidden message using reverse steganography. The decoded text is then broken down into structured segments for efficient analysis, after which it is stored in MongoDB, where cases are organized by severity level to prioritize urgent responses.

![Alt text](https://media.discordapp.net/attachments/932833339734368358/1306362496088543282/napkin-selection_3.png?ex=67366462&is=673512e2&hm=d540cab8b0ef4b8a51b99429d4cd909bfab1e6019fbd18b982e07fa5523c5dbf&=&format=webp&quality=lossless&width=468&height=398)
![Alt text](https://media.discordapp.net/attachments/932833339734368358/1306362495791009942/napkin-selection_4.png?ex=67366462&is=673512e2&hm=b9fe361dd72eac56c159019673e6e0edf910f0aa9e2a2af077ee5fe61db18c73&=&format=webp&quality=lossless&width=548&height=398)

### What Sets Haven Apart 🌠

- **Fast and Simple Communication:** Women in high-stress situations can quickly type keywords; our AI generates a full distress message, reducing time and risk.
- **Innovative Steganography Approach:** Hidden messages within everyday photos ensure total privacy from abusers, making the post appear harmless while alerting authorities.
- **Overcoming Unreliable Channels:** Many government websites are inaccessible due to technical issues or restrictions. Haven provides a reliable, always-accessible option to seek help, bypassing these barriers.

### Technical Details

| API Route              | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `/text-generation`     | Expands user input via Gemini/Gemma                  |
| `/img-generation`      | Generates an image from the user’s prompt            |
| `/encode`              | Encodes text into the generated image                |
| `/decode`              | Decodes text from the image                          |
| `/text-decomposition`  | Decomposes the decoded text into structured sections |
| `/save-extracted-data` | Saves the structured data in MongoDB                 |

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

![Alt text](https://media.discordapp.net/attachments/932833339734368361/1306347864208965642/f1.png?ex=673656c1&is=67350541&hm=ee914ef795c7f699df9f3923c0a61473d55c33f2386985ab42e62829a4156edf&=&format=webp&quality=lossless&width=1108&height=393)

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

![Alt text](https://media.discordapp.net/attachments/1302096541258874900/1306370263059005471/p2.png?ex=67366b9d&is=67351a1d&hm=fdfc171b2464905fc80dd5fecb9aa69ca7013c93d0460500b4d36280279b4618&=&format=webp&quality=lossless&width=716&height=398)

![Alt text](https://media.discordapp.net/attachments/1302096541258874900/1306370263599812739/p3.png?ex=67366b9e&is=67351a1e&hm=ab8f5032768b4e6084797cb7faf3adf2aa3c52413971d54a22033276ca048910&=&format=webp&quality=lossless&width=718&height=398)

**Authroity flow**

![Alt text](https://media.discordapp.net/attachments/1302096541258874900/1306371302491295765/image.png?ex=67366c95&is=67351b15&hm=03d4f0d0b988edd70391889905193900734fcc5be88922e6d888a5f271e3d7b8&=&format=webp&quality=lossless&width=958&height=398)

![Alt text](https://media.discordapp.net/attachments/1302096541258874900/1306371302860525651/image.png?ex=67366c95&is=67351b15&hm=8bab3647158d602f117269913842f00961810427bb80c5d32806f70bf4db5130&=&format=webp&quality=lossless&width=826&height=398)

## ![Alt text](https://media.discordapp.net/attachments/1302096541258874900/1306372440003313664/image.png?ex=67366da4&is=67351c24&hm=fa2a70fa868f368b79d49f1e1c9e78fc87ac67cb71bd52844b107736c8f41a86&=&format=webp&quality=lossless&width=826&height=398)

## **2. AI Avatar for Mental Health Support**

For many survivors of abuse, the **psychological toll** is just as devastating as the physical harm. However, only **10%** of women experiencing domestic abuse seek mental health support, often due to fear of judgment, lack of privacy, or limited access to professional services.

- Over **80%** of women facing abuse are at a higher risk of mental health issues such as **anxiety, depression**, and **PTSD**.
- **Haven** aims to bridge this gap, offering an accessible, **empathetic, and private** support system for women in distress.

### **How It Works:**

**Haven’s AI Avatar** provides **24/7 mental health support** through **confidential, non-judgmental conversations**. The avatar listens to users' concerns and offers:

- **Personalized coping strategies**
- **Calming techniques**
- **Relevant resources** to manage mental health, tailored specifically to the emotional needs of abuse survivors.

Whether a user experiences **panic attacks**, **emotional exhaustion**, or simply needs a safe space to express their feelings, **Haven** is always there, offering a compassionate presence when needed most. The best part? It's completely confidential—no need to worry about being overheard or judged.
![Alt text](https://media.discordapp.net/attachments/932833339734368358/1306323218281267270/napkin-selection_1.png?ex=67363fcd&is=6734ee4d&hm=b9ccab03f8f6188f7ca536fea886f22a809fc4b71ad99e8877658a17ea306152&=&format=webp&quality=lossless&width=827&height=398)

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

![Image](https://media.discordapp.net/attachments/1302096541258874900/1306369343411458229/Screen_3.png?ex=67366ac2&is=67351942&hm=14c1101be64e586b8b6bedcab4bc4324249f8b8109590cfece880d36163f67a8&=&format=webp&quality=lossless&width=527&height=350)

- **Model and Animation Loading:**  
  Upon initiating the conversation, the AI fetches **3D model files** (.glb format) and **animations** to bring the avatar to life. The avatar’s **facial morph targets** and animation sequences are initialized using **useGLTF**, allowing for **human-like interactions** with empathy.

- **User Data Retrieval:**  
  When a user interacts with the AI avatar, the system retrieves relevant data from previous conversations (stored **securely in MongoDB**) to offer a **personalized experience**. This enables the AI to understand the user’s emotional state, preferences, and history, ensuring continuity in support.

- **Natural Language Understanding:**  
  The AI uses a **Large Language Model (LLM)**, such as **Gemini**, to process the user’s input, understanding the **context**, **emotional tone**, and **urgency**. It then generates responses with **personalized coping strategies**, **calming techniques**, and other **mental health resources**.

- **Audio Generation and Lip-Sync:**  
  The AI’s responses are converted into **natural-sounding speech** using **ElevenLabs**’ **Text-to-Speech (TTS)** technology. The audio is base64-encoded, and synchronized with the avatar’s **lip movements**, ensuring **realistic lip-syncing**.

- **Facial Expression Mapping:**  
  **Gemini** provides specific cues (e.g., **smiling**, **frowning**) that are mapped to the avatar’s morph targets. This allows the avatar to show appropriate **emotional expressions**, reflecting the user’s emotions such as **fear**, **sadness**, or **relief**.

- **Animation Management:**  
  The avatar transitions smoothly between different **animations** (e.g., from **Idle** to **Talking**), making the interaction feel natural and **engaging**, reinforcing the emotional tone of the conversation.

### Screenshots

![Alt text](https://media.discordapp.net/attachments/1302096541258874900/1306370262190657557/p6.png?ex=67366b9d&is=67351a1d&hm=cdc1b2a2707f3f158e3a5fa1a6079cc77cd51d7144642d4558d92a1b660f7b28&=&format=webp&quality=lossless&width=713&height=398)

---

## **3. Law Bot for Legal Empowerment**

Haven is not just about providing immediate emotional and physical safety—it’s about **empowering women** with the knowledge of their legal rights . Our **law bot**, equipped with an in-depth understanding of the Indian Constitution (and expanding to global legal frameworks ), provides **instant guidance** on abuse cases, custody disputes, and property claims, enabling women to navigate the complex legal landscape with confidence .

In many parts of the world, only 14% of women have access to formal legal assistance , often due to cultural barriers, financial constraints, or lack of awareness. Haven aims to bridge this critical gap by offering **free, accessible legal guidance** at their fingertips

### **How It Works: 🤖**

Haven’s law bot is designed to provide **clear, understandable** information on a wide range of legal issues, tailored to the user’s unique situation . Women in need can simply ask the bot questions related to **abuse**, **divorce**, **child custody**, **property rights**, or other legal concerns, and receive instant, easy-to-understand responses based on national and international laws

![Law Bot Image](https://media.discordapp.net/attachments/932833339734368358/1306323218004578385/napkin-selection_2.png?ex=67363fcd&is=6734ee4d&hm=6ab54320717595848a5bae42e530507e7a08072da97846ea59273a8b0f0ebe44&=&format=webp&quality=lossless&width=821&height=398)

### **What Sets It Apart: 💡**

- **Accessible, On-Demand Legal Support:** Unlike traditional legal systems where waiting for an appointment or expensive consultations can delay action, the Haven law bot is available 24/7 to provide **immediate legal advice** 🕒. Women no longer have to wait to understand their rights or options; the bot offers quick, reliable answers to legal queries at any time.
- **Global Reach & Customizable to Local Laws:** Haven’s law bot is designed to adapt to various countries' laws . Whether users are in **India**, the **US**, or beyond, they will receive information specific to their region's legal framework, ensuring the advice is **relevant** and **applicable** to their situation.

- **Empowerment Through Knowledge:** Legal systems can often feel intimidating or inaccessible, especially for women facing abuse or discrimination . By providing easy access to legal resources, Haven empowers women to take **informed action**. It helps them advocate for their rights, pursue justice, and better understand the complexities of legal processes

### **Technical Details 🛠️**

![Law Bot Image](https://media.discordapp.net/attachments/932833339734368361/1306355147214946385/finalout.png?ex=67365d8a&is=67350c0a&hm=b7b84eca1530183699e65b9d69a8e1ae5c31be42176112f0b5c7104feb635848&=&format=webp&quality=lossless&width=907&height=602)

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

1. Aggregate the retrieved document chunks and pass them to an **LLM** (e.g., Gemini or a fine-tuned model) via the /text-generation API.
2. The LLM synthesizes a coherent and **legally sound** response based on the retrieved information.

**Bot Response :**

1. Present the generated response to the user in a **conversational format**.
2. Optionally, provide additional options for the user to ask follow-up questions or receive more detailed legal explanations.

### Screenshot

![Law Bot Image](https://media.discordapp.net/attachments/1302096541258874900/1306370262643511306/p4.png?ex=67366b9d&is=67351a1d&hm=3c0d85b54bf25d15883f28b367f746bcf281173a51c63a9e55b5a0673586b184&=&format=webp&quality=lossless&width=713&height=398)

![Law Bot Image](https://media.discordapp.net/attachments/1302096541258874900/1306370264153456680/p5.png?ex=67366b9e&is=67351a1e&hm=4b8cac30698139d9c2671d0906fe9eb70f2b4ae144a963be02dd3bfc932969a3&=&format=webp&quality=lossless&width=719&height=398)

### **Impact**

The law bot provides **immediate access** to legal knowledge, which can be a **game-changer** for women who otherwise might not know their rights or how to protect themselves . By offering **timely legal insights**, women can make more informed decisions about their safety, custody battles, or financial security, ultimately empowering them to take **control** of their lives

---

### **How AI Is Used Throughout the Project 🤖:**

- Text Generation and Text Expansion ✍️

  - AI powers Haven's ability to transform brief, incomplete messages into coherent, full distress signals. Through Large Language Models (LLMs) like Gemini, Haven expands user input, turning simple keywords or short phrases into comprehensive messages. This is essential in high-stress situations where a woman may not have the time or mental clarity to articulate her circumstances in full. The model ensures that the message accurately represents the severity of the situation while still being discreet.
  - Example: If a user types “help, scared, locked in room,” the AI expands it into a full message like: "I am trapped in my room, scared and unable to leave. Please help me." This message is then encoded in an image to be shared safely.
  - Has both **gemma and gemini** LLM model

- Culprit matching

  - When a user reports a distress situation, details about the culprit's physical and behavioral characteristics are embedded as vector representations. These embeddings capture nuanced details about the individual, creating a unique profile that is stored in MongoDB’s vector database.
  - Similarity Search with Cosine Similarity:
    When an authority initiates a search by selecting "Find Match," the system performs a cosine similarity operation on the stored embeddings. By comparing the incoming profile with existing data, the system identifies top N matches based on similarity scores, allowing authorities to see connections across reported cases.
  - Using **gemini** LLM model

- AI-Powered Poem Generation 📝

  - In moments of emotional distress, sometimes the simplest words can bring comfort. Haven's AI-Powered Poem Generator provides empowering, reassuring poems designed to remind women that help is on the way and that they are not alone. The AI generates short, encouraging poems based on the user's emotional state or current needs. These poems are designed to provide emotional support and the assurance that change is possible.

- example

```
The storm may rage, the darkness deep,
But within you, a fire you keep.
Strength will rise, like morning light,
Haven's arms, a beacon bright.
You are loved, you are strong, you are free,
A new beginning, waiting for thee.
```

- Has both **gemma and gemini** LLM model

- AI to Detect Severity of Situations 🚨

  - The LLM processes large text inputs and sorts them based on the severity and nature of the abuse, making it easier for authorities to quickly take action without reading through long descriptions.
  - Has both **gemma and gemini** LLM model

- Image Generation 🖼️

  - AI is used to create custom images based on user input, such as landscapes, flowers, or everyday objects. This enables the use of steganography—embedding distress messages within the images. These generated images appear completely innocent to outsiders, while secretly containing encoded help requests.
  - Example: A user may select an image of a flower. The AI embeds a distress message, which looks like a normal social media post but contains a hidden cry for help when decoded.

- AI-Powered Law Bot for Legal Support ⚖️

  - Haven’s Law Bot leverages AI to offer instant, confidential legal guidance. Trained on a vast array of legal resources—including national constitutions, local laws, and case precedents—the AI provides women with easy-to-understand answers to their legal questions, empowering them to take control of their situations. The Law Bot breaks down complex legal jargon into simple language, ensuring clarity and accessibility.
  - Example: A user can ask, "What should I do if my spouse is abusing me?" and the Law Bot will provide a clear step-by-step answer based on the relevant legal rights, such as filing a complaint or seeking a restraining order.
  - Using **gemini** LLM model

- Therapy Bot for Mental Health Support 💬

  - Haven’s Therapy Bot uses AI to provide personalized mental health support. This bot offers coping strategies, emotional support, and mindfulness exercises to help women manage anxiety, depression, and PTSD. By analyzing the user's input, the AI tailors its responses to the emotional state of the user, ensuring relevant advice is given in real-time.
  - Example: If a user is feeling anxious, the Therapy Bot may suggest breathing exercises, a grounding technique, or offer calming affirmations to reduce stress.
  - Using **gemini** LLM model

- Vector Embedding for Personalized Experience 🧠

  - To make interactions with the AI more personalized and contextually aware, vector embeddings are used to store and retrieve information. For each user, key data points (like their emotional state, past conversations, and preferences) are stored in MongoDB using embeddings generated from AI models like Sentence Transformers. This allows the AI to provide more informed responses over time.
  - Example: The AI can remember past interactions, such as a user’s previous emotional states or preferred coping strategies. This personalized knowledge allows the AI to provide more targeted advice, improving the support it offers over time.
  - Using **gemini** LLM model

---

### **Google Tools Used 🛠️:**

- Google AI Studio
- Maps
- Vertex AI
- Google cloud

**AI stuidio**
Found AI studio to be very helpful during prompt engineering
![Law Bot Image](https://media.discordapp.net/attachments/1302096541258874900/1306369624605982821/image.png?ex=67366b05&is=67351985&hm=8b2e44238a87306347f5a87ea289d55ef5e83ecd0be592903381415d69b59016&=&format=webp&quality=lossless&width=550&height=275)

---

### **Categories Our Platform Falls Under 🏆:**

- Best of Safety (Ending Violence against Women and Girls Everywhere)
- Best of Women's Healthcare
- Best Use of Gemini
- Best Use of Gemma
- Most Impactful Project
- Most Original Project

---

### **How Our Project Fits Into UN SDG 5 🌍**

Haven addresses critical aspects of **UN SDG 5** by empowering women in abusive situations, offering mental health support, and providing legal knowledge through AI . Here’s how it contributes to specific SDG 5 targets:

#### 1. **Discreet SOS Messaging System**

**Target 5.2**: End all forms of violence against women and girls

- **How Haven Aligns**: The **SOS messaging feature** allows women to **discreetly** request help, bypassing constant surveillance by encoding distress messages in images shared on social media . Our AI tool, "Corn," scans and decodes these messages, alerting authorities in real-time

#### 2. **AI Avatar for Relationship Support and Mental Health**

**Target 5.2**: End violence and exploitation

- **How Haven Aligns**: **AI mental health chatbot** provides **anonymous** and compassionate support tailored to survivors of abuse, offering **coping mechanisms**, resources, and encouragement

#### 3. **Law Bot with Knowledge of the Indian Constitution**

**Target 5.5**: Ensure full participation and equal opportunities
**Target 5.a**: Equal rights to economic resources and property ownership

- **How Haven Aligns**: By providing accessible legal guidance, Haven’s law bot helps women understand their rights, including protections against **domestic violence**, **rights in custody battles**, and **entitlements to property**.

#### 4. **Use of Enabling Technology**

**Target 5.b**: Promote empowerment of women through technology

- **How Haven Aligns**: Haven leverages **advanced AI technologies** like **Gemini** and **Gemma** to provide a **user-friendly**, secure, and empowering platform

---

### **How We Built It 🔧**

#### **Backend :**

- **Python 3.12 + FastAPI API development**
- **Google Generative AI**: For text and embedding generation
- **Pymongo**: MongoDB connection
- **Groq**: Fast AI Inference engine that uses Gemma model
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
- **VertexAI** and **@google/generative-ai**: For LLM inference
- **Clerk**: For authentication
- **Typescript**: Create functional components

#### **Deployment**

- **Render** for backend deployment
- **Vercel** for frontend deployment

---

**Challenges We Ran Into ⚠️:**

- Encountered delays with GCP account setup and API configurations
- Time constraints for creating the **most responsive UI**
- Had some difficulty with prompt engineering the queries for optimal result

---

**Accomplishments We're Proud Of 🏆:**

- Made a **working MVP** within 10 days, addressing both **technical complexity** and **social impact**
- Learned a lot of tools
