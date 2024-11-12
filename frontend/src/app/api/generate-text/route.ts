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
    // const res =
    //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed ';
    return NextResponse.json(
      { gemini: res.data.gemini_response },
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
