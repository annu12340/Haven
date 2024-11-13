'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { ArrowUp, Scale, Triangle, Check, Fingerprint } from 'lucide-react';
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
  { text: 'Indian Law', icon: <Scale className="text-gray-700" size={16} /> },
  {
    text: 'Indian Law IPC 320',
    icon: <Triangle className="text-gray-700" size={16} />,
  },
  { text: 'Women Rights', icon: <Check className="text-gray-700" size={16} /> },
  {
    text: 'Women Safety',
    icon: <Fingerprint className="text-gray-700" size={16} />,
  },
];

function Page() {
  const [messages, setMessages] = React.useState<
    {
      text: string;
      isUser: boolean;
    }[]
  >([]);

  const typingText = useTypingText('What can I help you with?');
  const [isThinking, setIsThinking] = React.useState<boolean>(false);
  // Custom hook for typing effect
  function useTypingText(text: string, speed: number = 100) {
    const [displayedText, setDisplayedText] = React.useState('');

    React.useEffect(() => {
      let index = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1));
        index++;
        if (index === text.length) clearInterval(intervalId);
      }, speed);

      return () => clearInterval(intervalId);
    }, [text, speed]);

    return displayedText;
  }

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

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-gray-700 mb-5">
          {typingText}
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center max-w-3xl w-full gap-2"
        >
          <div className="rounded-3xl flex w-full items-center bg-slate-100 border border-gray-300 p-1">
            <Input
              {...form.register('message')}
              className="focus-within:ring-0 ring-offset-transparent text-lg focus-visible:ring-0 bg-slate-100 rounded-3xl focus-visible:ring-transparent p-5 border-none"
              placeholder="Chat with Law Bot"
              autoComplete="off"
            />
            <Button
              className="bg-slate-300 rounded-full text-black cursor-pointer"
              disabled={isThinking || !form.formState.isValid}
              type="submit"
            >
              <ArrowUp size={24} />
            </Button>
          </div>
        </form>
        <div className="mt-5 flex items-center gap-5">
          {promptSuggestions.map((prompt, index) => (
            <button
              key={index}
              onClick={() =>
                handlePromptClick(
                  typeof prompt === 'string' ? prompt : prompt.text
                )
              }
              className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              {typeof prompt !== 'string' && prompt.icon}
              {typeof prompt === 'string' ? prompt : prompt.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-center max-w-3xl w-full mx-auto ">
      <div className="w-full overflow-y-auto rounded-md custom-scrollbar ">
        <div className="flex flex-col gap-2 h-[80vh] overflow-y-auto custom-scrollbar p-4">
          {messages.length > 0 &&
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
            ))}

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
      {messages.length > 0 && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center max-w-3xl w-full gap-2"
        >
          <div className="rounded-3xl flex w-full items-center border bg-slate-100 border-gray-300 p-1">
            <Input
              {...form.register('message')}
              className="focus-within:ring-0 ring-offset-transparent text-lg bg-slate-100 focus-visible:ring-0 rounded-3xl focus-visible:ring-transparent p-5 border-none"
              placeholder="Chat with Law Bot"
              autoComplete="off"
            />
            <Button
              className="bg-slate-300 rounded-full text-black cursor-pointer"
              disabled={isThinking || !form.formState.isValid}
              type="submit"
            >
              <ArrowUp size={24} />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Page;
