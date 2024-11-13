import PostDetail from '@/components/PostDetail';
import React from 'react';

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  return (
    <div className="h-full">
      <PostDetail id={id} />
    </div>
  );
}

export default Page;
