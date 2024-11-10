import LiveTitle from '@/components/LiveTitle';
import RealtimeList from '@/components/RealtimeList';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

async function Page() {
  const user = await currentUser();

  if (!user?.unsafeMetadata.isAdmin) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <LiveTitle />
      <RealtimeList />
    </div>
  );
}

export default Page;
