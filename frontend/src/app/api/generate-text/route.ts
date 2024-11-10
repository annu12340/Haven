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
  culpritInfo: string;
  currentSituation: string;
}

export async function POST(req: Request) {
  try {
    const data: GenerateTextRequestData = await req.json();
    console.log('received data:', data);
    // const res = await axios.post(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/text-generation`,
    //   data
    // );
    const res =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed ';
    return NextResponse.json({ text: res }, { status: 200 });
  } catch (error) {
    console.error('Image generation failed:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
