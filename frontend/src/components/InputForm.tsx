'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useClerk } from '@clerk/nextjs';
import { Textarea } from './ui/textarea';
import { LocateIcon } from 'lucide-react';
import axios from 'axios';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'Phone number must be at least 10 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  culpritInfo: z.string().min(5, {
    message: 'Culprit information must be at least 5 characters.',
  }),
  currentSituation: z.string().min(5, {
    message: 'Current situation must be at least 5 characters.',
  }),
});

interface InputFormProps {
  setResImage: (resImage: string) => void;
}

export function InputForm({ setResImage }: InputFormProps) {
  const { user } = useClerk();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.fullName || '',
      phone: '',
      location: '',
      culpritInfo: '',
      currentSituation: '',
    },
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          form.setValue('location', `Lat: ${latitude}, Lon: ${longitude}`);
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await axios.post('/api/generate-image', data);
      setResImage(res.data.url);
      console.log('Image generated:', res.data.url);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto space-y-6 w-full -mt-14"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type or auto-detect your location"
                  {...field}
                />
              </FormControl>
              <Button
                type="button"
                onClick={getUserLocation}
                className="mt-2 flex items-center gap-2"
                variant={'outline'}
              >
                <LocateIcon className="h-5 w-5" />
                Auto-detect Location
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="culpritInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Culprit Info</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the person involved"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentSituation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Situation</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the current situation"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Image</Button>
      </form>
    </Form>
  );
}
