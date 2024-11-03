import { currentUser } from '@clerk/nextjs/server';
export default async function Home() {
  const user = await currentUser();
  return (
    <main className="flex items-center justify-center">
      <p>{user ? `Welcome, ${user.fullName}` : 'Welcome, guest'}</p>
    </main>
  );
}
