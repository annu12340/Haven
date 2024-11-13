import { exec } from 'child_process';
import cors from 'cors';
import dotenv from 'dotenv';
import voice from 'elevenlabs-node';
import express from 'express';
import { promises as fs } from 'fs';
import OpenAI from 'openai';
import { VertexAI } from '@google-cloud/vertexai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '-', // Your OpenAI API key here, I used "-" to avoid errors when the key is not set but you should not do that
});

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = 'cgSgspJ2msm6clMCkdW9';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/voices', async (req, res) => {
  res.send(await voice.getVoices(elevenLabsApiKey));
});

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  await execCommand(
    `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
    // -y to overwrite the file
  );
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  await execCommand(
    `E:\\demo\\ai-avatar\\r3f-virtual-girlfriend-backend\\Rhubarb-Lip-Sync-1.13.0-Windows\\Rhubarb-Lip-Sync-1.13.0-Windows\\rhubarb.exe -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );
  // -r phonetic is faster but less accurate
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    res.send({
      messages: [
        {
          text: 'Hey dear... How was your day?',
          audio: await audioFileToBase64('audios/intro_0.wav'),
          lipsync: await readJsonTranscript('audios/intro_0.json'),
          facialExpression: 'smile',
          animation: 'Talking_1',
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64('audios/intro_1.wav'),
          lipsync: await readJsonTranscript('audios/intro_1.json'),
          facialExpression: 'sad',
          animation: 'Crying',
        },
      ],
    });
    return;
  }
  if (!elevenLabsApiKey || openai.apiKey === '-') {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64('audios/api_0.wav'),
          lipsync: await readJsonTranscript('audios/api_0.json'),
          facialExpression: 'angry',
          animation: 'Angry',
        },
        {
          text: "You don't want to ruin Wawa Sensei with a crazy ChatGPT and ElevenLabs bill, right?",
          audio: await audioFileToBase64('audios/api_1.wav'),
          lipsync: await readJsonTranscript('audios/api_1.json'),
          facialExpression: 'smile',
          animation: 'Laughing',
        },
      ],
    });
    return;
  }

  const project = 'tantrotsav-410809';
  const location = 'us-central1';
  const textModel = 'gemini-1.5-flash';
  const vertexAI = new VertexAI({ project: project, location: location });

  const generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: textModel,
    systemInstruction: {
      'role': 'system',
      'parts': [
        {
          'text':
            'You are a virtual therapy bot designed to provide emotional support and advice to women. Your goal is to listen empathetically and offer thoughtful, comforting advice. Respond with a JSON array of messages (max 3). Each message should include the following properties:\n- text: The message you are sending to the user.\n- facialExpression: The emotional tone of your message (e.g., smile, sad, calm, concerned, supportive).\n- animation: The animation corresponding to the emotional tone (e.g., Talking_0, Talking_1, Talking_2, Idle, Supportive, Relaxed).',
        },
      ],
    },
  });
  const request = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage || 'Hello' }],
      },
    ],
  };

  const result = await generativeModelPreview.generateContent(request);
  console.log('Full response: ', JSON.stringify(result)); // Log the full response

  // Ensure that candidates and parts are present before attempting to access them
  const candidate = result?.response?.candidates?.[0];
  const parts = candidate?.content?.parts;

  if (!parts || !parts[0]?.text) {
    console.error(
      'Expected content parts not found in the response. Check response structure.'
    );
    res
      .status(500)
      .send({ error: 'Unexpected response structure from Google Gemini API.' });
    return;
  }

  let messages;
  try {
    // Extract the JSON string from the Markdown block
    const jsonResponse =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Remove the Markdown code block formatting (i.e., ```json and closing ```)
    const cleanJsonString = jsonResponse
      .replace(/^```json\s*\n/, '')
      .replace(/\n```$/, '');

    // Now parse the cleaned-up JSON string
    messages = JSON.parse(cleanJsonString);
    console.log('Parsed JSON response:', messages);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    res
      .status(500)
      .send({ error: 'Error parsing response from Google Gemini API.' });
    return;
  }

  // Further process `messages` as needed

  if (messages.messages) {
    messages = messages.messages; // ChatGPT is not 100% reliable, sometimes it directly returns an array and sometimes a JSON object with a messages property
  }
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    // generate audio file
    const fileName = `audios/message_${i}.mp3`; // The name of your audio file
    const textInput = message.text; // The text you wish to convert to speech
    await voice.textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
    // generate lipsync
    await lipSyncMessage(i);
    message.audio = await audioFileToBase64(fileName);
    message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
  }

  res.send({ messages });
});

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, 'utf8');
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString('base64');
};

app.listen(port, () => {
  console.log(`Virtual Girlfriend listening on port ${port}`);
});
