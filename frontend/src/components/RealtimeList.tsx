'use client';

import { useEffect, useState } from 'react';
import Card from './Card';

// Define a type for the post data
interface Post {
  _id: string;
  name: string;
  location: string;
  severity: string;
  issue: string;
  other_info: string;
  // Add other fields from your post as needed
}

export default function RealtimeList() {
  const [posts, setPosts] = useState<Post[]>([]); // Type the posts state as an array of Post objects
  const [error, setError] = useState<string | null>(null); // Error can be a string or null

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/getPosts');
        const data = await response.json();

        if (response.ok) {
          setPosts(data); // TypeScript will infer this as an array of Post objects
        } else {
          setError(data.message);
        }
      } catch {
        setError('Failed to fetch posts');
      }
    }

    fetchPosts();
  }, []);

  console.log(posts);

  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center  items-center w-full">
      <div className="max-w-2xl w-full mx-auto">
        {posts.map((post) => (
          <Card data={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
