import React from 'react';
import { Button } from './ui/button';
import { ShareIcon } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';

interface ShareProps {
  imageURL: string;
  resText: string;
  setShared: (shared: boolean) => void;
}

function Share({ imageURL, resText, setShared }: ShareProps) {
  const [encodedImage, setEncodedImage] = React.useState<string>('');
  const handleCommonFunction = async () => {
    // decode api - img as url (main branch)
    // decompose - generated text
    // save to db
    console.log('resText: ', resText);
    const encodeImage = await axios.post('/api/decompose', {
      resImage: imageURL,
    });
    setEncodedImage(encodeImage.data.encodedImage);
    const decomposeReq = await axios.post('/api/decompose', {
      resText: resText,
    });
    // add status(pending) to decomposeReq.data.decomposed
    const data = {
      ...decomposeReq.data.decomposed,
      status: 'pending',
    };
    const saveReq = await axios.post('/api/save', data);
    if (saveReq.status !== 200) {
      console.log('Failed to save to DB');
    }
  };

  const handleShareTelegram = () => {
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      encodedImage
    )}`;
    window.open(telegramShareUrl, '_blank');

    handleCommonFunction();
    setShared(true);
  };

  const handleShareTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      imageURL
    )}`;
    window.open(twitterShareUrl, '_blank');
    handleCommonFunction();
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
