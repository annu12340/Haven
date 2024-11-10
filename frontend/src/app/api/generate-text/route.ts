import { NextResponse } from 'next/server';
import axios from 'axios';

interface GenerateImageRequestData {
  name: string;
  phone: string;
  location: string;
  culpritInfo: string;
  currentSituation: string;
}

export async function POST(req: Request) {
  try {
    const data: GenerateImageRequestData = await req.json();
    console.log('received data:', data);
    // Replace `imageGenerationAPIUrl` with your actual endpoint.
    // const imageGenerationAPIUrl = 'https://example.com/api/generate-image';

    // Set up any necessary API keys or headers.
    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer YOUR_API_KEY`, // Replace with your API key
    // };

    // const response = await axios.post(imageGenerationAPIUrl, data, { headers });
    const response = {
      data: {
        url: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
      },
    };
    const imageUrl = response.data.url;
    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error('Image generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
