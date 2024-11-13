'use client';
import Link from 'next/link';
import React from 'react';
import { LoginDropdown } from './LoginDropdown';
import { ModeToggle } from './ModeToggle';
import SignOut from './SignOut';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

function Navbar() {
  const pathname = usePathname(); // Get current path
  const { user } = useClerk();

  // Function to check if a link is active
  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full h-16 p-4 flex items-center justify-between border-b shadow-sm">
      <Link
        href={'/'}
        className="font-bold text-2xl tracking-wide hover:text-blue-500 transition-colors duration-200"
      >
        Support<span className="text-blue-700">Safe</span>
      </Link>
      <div className="flex items-center justify-center gap-10 font-medium text-gray-600">
        <Link
          href="/"
          className={`${
            isActive('/')
              ? 'text-blue-700 font-semibold'
              : 'hover:text-blue-700'
          } transition-colors duration-200`}
        >
          Home
        </Link>
        {!user?.unsafeMetadata.isAdmin && (
          <Link
            href="/create-post"
            className={`${
              isActive('/create-post')
                ? 'text-blue-700 font-semibold'
                : 'hover:text-blue-700'
            } transition-colors duration-200`}
          >
            Create Post
          </Link>
        )}
        {(user?.unsafeMetadata as { isAdmin: boolean })?.isAdmin && (
          <Link
            href="/dashboard"
            className={`${
              isActive('/dashboard')
                ? 'text-blue-700 font-semibold'
                : 'hover:text-blue-700'
            } transition-colors duration-200`}
          >
            Dashboard
          </Link>
        )}
        <Link
          href="/lawbot"
          className={`${
            isActive('/lawbot')
              ? 'text-blue-700 font-semibold'
              : 'hover:text-blue-700'
          } transition-colors duration-200`}
        >
          Law Bot
        </Link>
        <Link
          href="/therapybot"
          className={`${
            isActive('/therapybot')
              ? 'text-blue-700 font-semibold'
              : 'hover:text-blue-700'
          } transition-colors duration-200`}
        >
          Therapy Bot
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        {!user ? <LoginDropdown /> : <SignOut />}
      </div>
    </nav>
  );
}

export default Navbar;
