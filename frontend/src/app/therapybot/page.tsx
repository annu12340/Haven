'use client';
import React from 'react';
import { useAvatar } from '@avatechai/avatars/react';

function Page() {
  const { avatarDisplay } = useAvatar({
    avatarId: 'af3f42c9-d1d7-4e14-bd81-bf2e05fd11a3',
    scale: 1,
  });
  return (
    <div className="h-full flex items-center justify-center">
      {avatarDisplay}
    </div>
  );
}

export default Page;
