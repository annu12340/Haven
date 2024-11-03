'use client';
import React from 'react';
import { InputForm } from '@/components/InputForm';
import Share from '@/components/Share';
import { useClerk } from '@clerk/nextjs';

function Page() {
  const [resImage, setResImage] = React.useState<string | null>(null);
  const { user } = useClerk();
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center -mt-[150px]">
          <h1 className="text-2xl font-bold">Please sign in to continue</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen">
      {resImage ? (
        <Share imageURL={resImage} />
      ) : (
        <InputForm setResImage={setResImage} />
      )}
    </div>
  );
}

export default Page;
