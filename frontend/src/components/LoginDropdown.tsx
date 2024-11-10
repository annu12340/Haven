'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignInButton, useSignIn } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';

export function LoginDropdown() {
  const { signIn } = useSignIn();

  if (!signIn) return <h1>Not Available!</h1>;

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/user/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Login</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel>Login Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          onClick={() => signInWith('oauth_google')}
          className="cursor-pointer"
        >
          Individual
        </DropdownMenuCheckboxItem>
        <SignInButton>
          <DropdownMenuCheckboxItem className="cursor-pointer">
            Govt Official
          </DropdownMenuCheckboxItem>
        </SignInButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
