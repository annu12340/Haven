import axios from 'axios';
import { NextResponse } from 'next/server';

interface GenerateTextRequestData {
  name: string;
  phone: string;
  location: { lat: number; lng: number };
  occurrenceDuration: number;
  frequency: number;
  visibleInjuries: 'Yes' | 'No';
  preferredContact: string[];
  culprit: string;
  currentSituation: string;
}

export async function POST(req: Request) {
  try {
    const data: GenerateTextRequestData = await req.json();
    const updatedData = {
      name: data.name,
      phone: data.phone,
      location: data.location,
      duration_of_abuse: data.occurrenceDuration,
      frequency_of_incidents: data.frequency,
      preferred_contact_method: data.preferredContact,
      culprit_description: data.culprit,
      current_situation: data.currentSituation,
    };

    console.log('received data:', updatedData);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/text-generation`,
      updatedData
    );
    console.log('Text next api:', res.data.gemini_response);
    // const res = {
    //   data: {
    //     gemini_response:
    //       "This is an urgent plea for help. My name is Kavikumar M and I need immediate assistance. I am located at 13.0646016, 80.2062336. I am reporting a child abuse situation and I am afraid for the child's safety. This has been happening for 10 years, and it happens on average 7 times a week. I need to speak to someone right now.  The abuser is a person with dark skin. The child is currently being hurt and needs your immediate help. Please call me at 9025313327. I need you to come as soon as possible. The situation is incredibly serious and I fear for the child's well-being. ",
    //   },
    // };
    return NextResponse.json(
      {
        gemini_response: res.data.gemini_response,
        gemma_response: res.data.gemma_response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Image generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
