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
    <nav className="w-full h-16 p-3 flex items-center justify-between border-b shadow-sm">
      <Link
        href={'/'}
        className="font-bold text-lg hover:text-blue-500 transition-colors duration-200"
      >
        Logo
      </Link>
      <div className="flex items-center justify-center gap-6">
        <Link
          href="/"
          className={`${
            isActive('/')
              ? 'text-blue-500 font-semibold'
              : 'hover:text-blue-500'
          } transition-colors duration-200`}
        >
          Home
        </Link>
        {!user?.unsafeMetadata.isAdmin && (
          <Link
            href="/create-post"
            className={`${
              isActive('/create-post')
                ? 'text-blue-500 font-semibold'
                : 'hover:text-blue-500'
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
                ? 'text-blue-500 font-semibold'
                : 'hover:text-blue-500'
            } transition-colors duration-200`}
          >
            Dashboard
          </Link>
        )}
        <Link
          href="/lawbot"
          className={`${
            isActive('/lawbot')
              ? 'text-blue-500 font-semibold'
              : 'hover:text-blue-500'
          } transition-colors duration-200`}
        >
          Law Bot
        </Link>
        <Link
          href="/therapybot"
          className={`${
            isActive('/therapybot')
              ? 'text-blue-500 font-semibold'
              : 'hover:text-blue-500'
          } transition-colors duration-200`}
        >
          Therapy Bot
        </Link>
        <Link
          href="/guidelines"
          className={`${
            isActive('/guidelines')
              ? 'text-blue-500 font-semibold'
              : 'hover:text-blue-500'
          } transition-colors duration-200`}
        >
          Guidelines
        </Link>
        <Link
          href="/about"
          className={`${
            isActive('/about')
              ? 'text-blue-500 font-semibold'
              : 'hover:text-blue-500'
          } transition-colors duration-200`}
        >
          About Us
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
