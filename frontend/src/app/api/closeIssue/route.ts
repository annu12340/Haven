import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface CloseIssueRequest {
  issueId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { issueId } = (await request.json()) as CloseIssueRequest;
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/close-issue/${issueId}`
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to close issue' },
      { status: 500 }
    );
  }
}
