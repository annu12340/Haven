import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Load your API key from environment variables

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();

    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Call the model to generate content based on user input
    const result = await model.generateContent(userInput);

    // Return the response from Gemini AI as JSON
    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'There was an issue processing your request.' },
      { status: 500 }
    );
  }
}
