import React from 'react';
import { Button } from './ui/button';
import { ShareIcon } from 'lucide-react';
import Image from 'next/image';

interface ShareProps {
  imageURL: string;
  setShared: (shared: boolean) => void;
}

function Share({ imageURL, setShared }: ShareProps) {
  const handleShareTelegram = () => {
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      imageURL
    )}`;
    window.open(telegramShareUrl, '_blank');
    // decode api - img as url (main branch)
    // decompose - generated text
    // save
    setShared(true);
  };

  const handleShareTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      imageURL
    )}`;
    window.open(twitterShareUrl, '_blank');
    setShared(true);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Adjusted Image size */}
      <div className="relative w-[500px] h-[500px]">
        <Image
          src={imageURL}
          alt="Generated Image"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={handleShareTelegram}
        >
          <ShareIcon size={24} />
          Share on Telegram
        </Button>
        <Button
          variant="default"
          className="flex items-center gap-2 bg-black text-white"
          onClick={handleShareTwitter}
        >
          <ShareIcon size={24} />
          Share on Twitter
        </Button>
        <Button
          variant="default"
          // instagram colors
          className="flex items-center gap-2 bg-gradient-to-r from-[#405DE6] to-[#5851DB] text-white"
        >
          <ShareIcon size={24} />
          Share on Instagram
        </Button>
        <Button variant="default" className="flex items-center gap-2">
          <ShareIcon size={24} />
          Share on Slack
        </Button>
      </div>
    </div>
  );
}

export default Share;
