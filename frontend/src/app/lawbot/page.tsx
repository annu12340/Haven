'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import modelImage from '../../assets/modelLogo.png';
import { Skeleton } from '@/components/ui/skeleton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

type ChatFormValues = z.infer<typeof ChatSchema>;

const promptSuggestions = [
  'What are my rights as a tenant?',
  'Explain the process of filing a lawsuit.',
  'What should I know before signing a contract?',
  'How can I apply for a patent?',
  'What are the laws around defamation?',
];

function Page() {
  const [messages, setMessages] = React.useState<
    {
      text: string;
      isUser: boolean;
    }[]
  >([]);
  const [isThinking, setIsThinking] = React.useState<boolean>(false);

  const { user } = useClerk();
  const form = useForm<ChatFormValues>({
    resolver: zodResolver(ChatSchema),
    defaultValues: { message: '' },
  });

  const onSubmit = async (data: ChatFormValues) => {
    setMessages((prev) => [...prev, { text: data.message, isUser: true }]);
    form.reset();
    setIsThinking(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ userInput: data.message }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    setMessages((prev) => [...prev, { text: result.reply, isUser: false }]);
    setIsThinking(false);
  };

  const handlePromptClick = (prompt: string) => {
    form.setValue('message', prompt);
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col h-full items-center justify-center max-w-5xl w-full mx-auto ">
      <div className="w-full overflow-y-auto border-2 rounded-md custom-scrollbar bg-slate-50">
        <div className="flex flex-col gap-2 h-[80vh] overflow-y-auto custom-scrollbar p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-3">
              <p className="text-center font-semibold" suppressHydrationWarning>
                {user ? user.firstName : <span>Guest</span>}, welcome to Law
                bot!
              </p>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-center">
                  Try asking something like the below prompt!
                </p>
                {promptSuggestions.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-left text-blue-600 underline hover:text-blue-800 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  message.isUser ? 'justify-end' : ''
                }`}
              >
                {!message.isUser && (
                  <Image
                    src={modelImage}
                    alt="Bot Avatar"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                )}
                <div
                  className={`py-2 px-3 rounded-md max-w-[70%] ${
                    message.isUser
                      ? 'bg-green-500 text-white self-end'
                      : 'bg-gray-300 text-black self-start'
                  }`}
                >
                  {message.isUser ? (
                    message.text
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>

                {message.isUser && user && (
                  <Image
                    src={user?.imageUrl || ''}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                    width={32}
                    height={32}
                  />
                )}
                {message.isUser && !user && (
                  <div className="rounded-full border shadow-sm h-10 w-10 flex items-center justify-center ">
                    <h1 className="font-semibold">G</h1>
                  </div>
                )}
              </div>
            ))
          )}

          {isThinking && (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          )}
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center w-full gap-2 mt-4"
      >
        <Input
          {...form.register('message')}
          className="flex-1 border-2 border-primary focus-visible:ring-0"
          placeholder="Chat with law bot..."
          autoComplete="off"
        />
        <Button
          className="border-primary border-2"
          variant="outline"
          disabled={isThinking || !form.formState.isValid}
          type="submit"
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  );
}

export default Page;
