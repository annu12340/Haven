'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
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
import { LocateIcon } from 'lucide-react';
import axios from 'axios';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const abuseTypes = ['Physical', 'Emotional', 'Sexual', 'Financial', 'Verbal'];
const contactMethods = ['Phone', 'Email', 'Text message', 'In-person'];

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
  typeOfAbuse: z.array(z.string()).min(1, {
    message: 'Please select at least one type of abuse.',
  }),
  immediateThreat: z.enum(['Yes', 'No']),
  occurrenceDuration: z
    .number()
    .min(1, { message: 'Please specify a duration.' }),
  frequency: z.number().min(1, { message: 'Please specify a frequency.' }),
  visibleInjuries: z.enum(['Yes', 'No']),
  preferredContact: z
    .array(z.enum(['Phone', 'Email', 'Text message', 'In-person']))
    .min(1, {
      message: 'Please select at least one contact method.',
    }),
  currentSituation: z
    .string()
    .min(5, { message: 'Please describe the current situation.' }),
  culprit: z.string().min(5, { message: 'Please describe the culprit.' }),
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
      typeOfAbuse: [],
      immediateThreat: 'No',
      occurrenceDuration: 1,
      frequency: 1,
      visibleInjuries: 'No',
      preferredContact: [],
      currentSituation: '',
      culprit: '',
    },
  });

  // States to store the current slider values
  const [occurrenceDuration, setOccurrenceDuration] = useState(1);
  const [frequency, setFrequency] = useState(1);

  const getUserLocation = async () => {
    try {
      const res = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.NEXT_PUBLIC_GEOLOCATION_API}`,
        {
          considerIp: true,
        }
      );

      const { location } = res.data;
      const latLon = `Lat: ${location.lat}, Lon: ${location.lng}`;
      form.setValue('location', latLon);
    } catch (error) {
      console.error('Error fetching location from Google API:', error);
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
        className="max-w-2xl mx-auto space-y-6 w-full"
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
          name="typeOfAbuse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Abuse</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {abuseTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value.includes(type)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, type]
                            : field.value.filter((item) => item !== type);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occurrenceDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How long has it been occurring</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Slider
                    {...field}
                    value={[occurrenceDuration]}
                    min={1}
                    max={100}
                    onValueChange={(value) => {
                      setOccurrenceDuration(value[0]);
                      field.onChange(value[0]);
                    }}
                  />
                  <span>{occurrenceDuration}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency of Incidents</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Slider
                    {...field}
                    value={[frequency]}
                    min={1}
                    max={100}
                    onValueChange={(value) => {
                      setFrequency(value[0]);
                      field.onChange(value[0]);
                    }}
                  />
                  <span>{frequency}</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="immediateThreat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Immediate Threat</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="Yes" />
                    </FormControl>
                    <FormLabel className="font-normal ml-2">Yes</FormLabel>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="No" />
                    </FormControl>
                    <FormLabel className="font-normal ml-2">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Contact Method</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  {contactMethods.map((method) => (
                    <div key={method} className="flex items-center gap-2">
                      <Checkbox
                        checked={field.value.includes(
                          method as
                            | 'Phone'
                            | 'Email'
                            | 'Text message'
                            | 'In-person'
                        )}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...field.value, method]
                            : field.value.filter((item) => item !== method);
                          field.onChange(newValue);
                        }}
                      />
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
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

        <FormField
          control={form.control}
          name="culprit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Culprit</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the culprit" {...field} />
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
