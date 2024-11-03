'use client';
import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';

function SignOut() {
  const { signOut } = useAuth();
  return (
    <Button variant={'outline'} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}

export default SignOut;
