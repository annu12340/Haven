import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  console.log(user);
  return (
    <main className="flex flex-col items-center justify-center">
      <p>{user ? `Welcome, ${user.fullName}` : 'Welcome, guest'}</p>
    </main>
  );
}
