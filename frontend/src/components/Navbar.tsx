import Link from 'next/link';
import React from 'react';
import { LoginDropdown } from './LoginDropdown';
import { ModeToggle } from './ModeToggle';
import { currentUser } from '@clerk/nextjs/server';
import SignOut from './SignOut';

async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="w-full p-3 flex items-center justify-between border-b shadow-sm">
      <Link href={'/'}>Logo</Link>
      <div className="flex items-center justify-center gap-6">
        <Link href="/">Home</Link>
        {!user?.unsafeMetadata.isAdmin && (
          <Link href="/create-post">Create Post</Link>
        )}
        {(user?.unsafeMetadata as { isAdmin: boolean })?.isAdmin && (
          <Link href="/dashboard">Dashboard</Link>
        )}
        <Link href="/guidelines">Guidelines</Link>
        <Link href="/about">About Us</Link>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {!user ? <LoginDropdown /> : <SignOut />}
      </div>
    </nav>
  );
}

export default Navbar;
