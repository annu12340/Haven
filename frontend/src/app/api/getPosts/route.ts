// app/api/posts/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace with your FastAPI backend URL
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-admin-posts`
    );

    // Check if the response was successful
    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: `Error fetching posts: ${response.statusText}` },
        { status: response.status }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: `Server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
