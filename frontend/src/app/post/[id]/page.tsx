import PostDetail from '@/components/PostDetail';
import React from 'react';

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  return (
    <div className="h-full">
      <PostDetail id={id} />
    </div>
  );
}

export default Page;
