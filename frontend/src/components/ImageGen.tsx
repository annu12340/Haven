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
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

// Zod validation schema for form
const FormSchema = z.object({
  generatedText: z.string(),
  imagePrompt: z
    .string()
    .min(3, { message: 'Please specify the image prompt.' }),
});

export default function ImageGen({
  text,
  textGemma,
  setResImage,
}: {
  text: string;
  textGemma: string;
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
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>(''); // Default model

  const promptSuggestions = [
    'Good Morning',
    'Good Night',
    'Sunset',
    'Mountains',
    'Ocean',
  ];
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true); // Start loading state
    try {
      const res = await axios.post('/api/generate-image', data);
      console.log('Image options generated:', res.data.images); // Assuming API returns images array
      setImageOptions(res.data.images); // Set multiple image options
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue('imagePrompt', suggestion);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl); // Set the selected image as final
    setResImage(imageUrl); // Update the parent component with the final image URL
  };

  const handleTextOptionClick = (text: string) => {
    setSelectedText(text); // Set the selected text
    if (text === textGemma) {
      setSelectedModel('gemma'); // Set the model to Gemma
    } else {
      setSelectedModel('gemini'); // Set the model to Gemini
    }
    form.setValue('generatedText', text); // Update the form field with the selected text
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-9 w-full"
      >
        <FormField
          control={form.control}
          name="generatedText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Generated Text</FormLabel>
              <FormControl>
                {!selectedText ? (
                  <div className="space-x-2 flex items-center w-full ">
                    {[text, textGemma].map((textOption, index) => (
                      <div
                        key={index}
                        onClick={() => handleTextOptionClick(textOption)}
                        className="cursor-pointer w-full bg-slate-200 p-2 rounded-md hover:bg-slate-300"
                      >
                        <div className="flex flex-col items-center pt-4 justify-between h-[330px]">
                          <span>{textOption}</span>
                          <span
                            className={`${
                              textOption === textGemma
                                ? 'bg-gradient-to-tr from-orange-500 to-orange-300 text-white'
                                : 'bg-gradient-to-tr from-blue-500 to-blue-400 text-white'
                            } text-xs rounded-full py-1 px-2 max-w-[60px] mt-3`}
                          >
                            {textOption === textGemma ? 'Gemma' : 'Gemini'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Textarea {...field} value={selectedText} rows={8} />
                )}
              </FormControl>
              {selectedText && (
                <div className="flex items-center gap-2 font-medium text-slate-700 float-right text-sm">
                  <SparklesIcon size={18} />
                  <h1>
                    Generated with{' '}
                    <Link
                      href={'https://gemini.google.com/'}
                      target="_blank"
                      className="underline underline-offset-2 text-blue-600"
                    >
                      {selectedModel === 'gemma' ? 'Gemma' : 'Gemini'}
                    </Link>
                  </h1>
                </div>
              )}
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
                  className=""
                  placeholder="Enter Image Prompt (e.g., Good Morning, Sunset)"
                  {...field}
                />
              </FormControl>
              <div className="flex gap-2 mt-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-slate-200 text-slate-700 text-sm px-3 py-1 rounded-xl hover:bg-slate-300 transition duration-150"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
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
          <h2 className="text-xl font-semibold">Generating Images...</h2>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-[192px] w-full bg-gray-300" />
            ))}
          </div>
        </div>
      ) : imageOptions && imageOptions.length > 0 ? (
        <div className="mt-6 space-y-4 mb-6">
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
    </Form>
  );
}
