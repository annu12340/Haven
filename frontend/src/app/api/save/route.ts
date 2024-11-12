import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/save-extracted-data`,
      data
    );
    return NextResponse.json({ data: res.data.status }, { status: 200 });
  } catch (error) {
    console.error('Image generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
