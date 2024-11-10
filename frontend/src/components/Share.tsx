import React from 'react';
import { Button } from './ui/button';
import { ShareIcon } from 'lucide-react';
import Image from 'next/image';

interface ShareProps {
  imageURL: string;
  setShared: (shared: boolean) => void;
}

function Share({ imageURL, setShared }: ShareProps) {
  const handleShare = async () => {
    // Share on Telegram
    console.log('Sharing on Telegram');
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
          onClick={handleShare}
        >
          <ShareIcon size={24} />
          Share on Telegram
        </Button>
        <Button
          variant="default"
          className="flex items-center gap-2 bg-black text-white"
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
