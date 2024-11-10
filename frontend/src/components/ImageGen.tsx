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
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton'; // Assuming Skeleton component is from your UI library

// Zod validation schema for form
const FormSchema = z.object({
  generatedText: z.string(),
  imagePrompt: z
    .string()
    .min(3, { message: 'Please specify the image prompt.' }),
});

export default function ImageGen({
  text,
  setResImage,
}: {
  text: string;
  setResImage: (resImage: string) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      generatedText: text || '',
      imagePrompt: '',
    },
  });

  const [imageOptions, setImageOptions] = useState<string[] | null>(null); // To hold the array of image URLs
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // To store the selected image
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state for images

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true); // Start loading state
    try {
      // Simulate a small delay before images are fetched
      setTimeout(async () => {
        try {
          const res = await axios.post('/api/generate-image', data);
          console.log('Image options generated:', res.data.images); // Assuming API returns images array
          setImageOptions(res.data.images); // Set multiple image options
        } catch (error) {
          console.error('Error generating images:', error);
        } finally {
          setIsLoading(false); // End loading state
        }
      }, 2000); // Add a 1-second delay for the loading skeleton to show
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set the selected image as final
    setResImage(imageUrl); // Update the parent component with the final image URL
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="generatedText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generated Text</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imagePrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Prompt</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Image Prompt (e.g., Good Morning, Sunset)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Generate Images
        </Button>
      </form>

      {isLoading ? (
        // Skeleton loader shown while the images are being generated
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[192px] w-full bg-gray-300" />
            ))}
          </div>
        </div>
      ) : imageOptions && imageOptions.length > 0 ? (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold">Select an Image</h2>
          <div className="grid grid-cols-3 gap-4">
            {imageOptions.map((imageUrl, index) => (
              <div
                key={index}
                className="cursor-pointer shadow hover:shadow-lg hover:scale-105 duration-200"
                onClick={() => handleImageSelect(imageUrl)}
              >
                <div className="relative w-full h-48 overflow-hidden rounded-md">
                  <Image
                    src={imageUrl}
                    alt={`Generated Image ${index + 1}`}
                    layout="fill"
                    objectFit="cover" // Ensures image fills the space without distortion
                    className="rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {selectedImage && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Final Selected Image</h2>
          <div className="relative w-full h-80 overflow-hidden">
            <Image
              src={selectedImage}
              alt="Selected Generated Image"
              layout="fill"
              objectFit="cover" // Ensure the image is properly scaled
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </Form>
  );
}
