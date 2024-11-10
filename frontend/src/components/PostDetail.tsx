'use client';
import React, { useEffect, useState } from 'react';

function PostDetail({ id }: { id: string }) {
  interface Post {
    name: string;
    issue: string;
    severity: string;
    location: {
      lat: number;
      lng: number;
    };
    other_info: string;
  }

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        const response = await fetch(`/api/postbyid/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      }
    };

    fetchPostById();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <h1 className="text-black">{post.name}</h1>
      <p>{post.issue}</p>
      <p>Severity: {post.severity}</p>
      <p>
        Location: {post.location.lat}, {post.location.lng}
      </p>
      <p>Other info: {post.other_info}</p>
    </div>
  );
}

export default PostDetail;
