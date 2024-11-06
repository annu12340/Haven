'use client';

import * as React from 'react';
import { useSignUp, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

// Extend the schema to include name and phone number fields
const SignUpSchema = z.object({
  emailAddress: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  code: z.string().optional(),
});

type SignUpFormValues = z.infer<typeof SignUpSchema>;

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  // const { user } = useAuth();
  const { user } = useUser();
  const [verifying, setVerifying] = React.useState(false);
  const [needsMetadataUpdate, setNeedsMetadataUpdate] = React.useState(false);

  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      emailAddress: '',
      password: '',
      name: '',
      phoneNumber: '',
      code: '',
    },
  });

  const handleSubmit = async (data: SignUpFormValues) => {
    if (!isLoaded) return;

    try {
      // Start sign-up process with email, password, name, and phone number
      await signUp.create({
        emailAddress: data.emailAddress,
        password: data.password,
        // split name into first and last name
        firstName: data.name.split(' ')[0],
        lastName: data.name.split(' ')[1],
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setVerifying(true); // Move to the verification step
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (data: SignUpFormValues) => {
    if (!isLoaded || !data.code) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        // console.log(user);
        setNeedsMetadataUpdate(true);

        toast.success('Sign up successful!'); // Display success message
        router.push('/');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  React.useEffect(() => {
    // Update metadata once user becomes available and needs update
    if (user && needsMetadataUpdate) {
      user
        .update({
          unsafeMetadata: {
            phone: form.getValues('phoneNumber'),
            isAdmin: true,
          },
        })
        .then(() => {
          setNeedsMetadataUpdate(false); // Reset flag
        })
        .catch((err) => {
          console.error(
            'Failed to update metadata:',
            JSON.stringify(err, null, 2)
          );
        });
    }
  }, [user, needsMetadataUpdate, form]);

  if (verifying) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-5 -mt-[100px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleVerify)}
            className="space-y-4 max-w-xl w-full"
          >
            <h1>Verify your email</h1>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your verification code</FormLabel>
                  <FormControl>
                    <Input placeholder="Verification code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Verify</Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-5 -mt-[100px]">
      <h1 className="text-2xl font-semibold">Sign up to Admin Portal</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 max-w-xl w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Continue</Button>
        </form>
      </Form>
    </div>
  );
}
