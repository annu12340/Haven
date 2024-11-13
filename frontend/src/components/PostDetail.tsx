'use client';
import { fetchCityName } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface Post {
  Name: string;
  Location: string;
  'Preferred way of contact': string;
  'Contact info': string;
  'Frequency of domestic violence': string;
  'Relationship with perpetrator': string;
  'Severity of domestic violence': string;
  'Nature of domestic violence': string;
  'Impact on children': string;
  'Culprit details': string;
  'Other info': string;
  status: string;
}

function PostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);

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

  useEffect(() => {
    if (post) {
      const [lat, lng] = post.Location.split(',').map(Number);

      const fetchCity = async () => {
        try {
          const cityName = await fetchCityName(lat, lng);
          setCity(cityName);
        } catch (err) {
          console.error('Failed to fetch city name:', err);
        }
      };

      fetchCity();
    }
  }, [post]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  const [lat, lng] = post.Location.split(',').map(Number);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAP_KEY}&q=${lat},${lng}`;

  return (
    <div className="h-full p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.Name}</h1>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Status:</span> {post.status}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Preferred way of contact:</span>{' '}
            {post['Preferred way of contact']}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">
              Relationship with perpetrator:
            </span>{' '}
            {post['Relationship with perpetrator']}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Contact:</span>{' '}
            {post['Contact info']}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Frequency:</span>{' '}
            {post['Frequency of domestic violence']}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Nature of domestic violence:</span>{' '}
            {post['Nature of domestic violence']}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Severity:</span>{' '}
            {post['Severity of domestic violence']}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Location:</span>{' '}
            {city ? `${city} (${post.Location})` : `Loading city...`}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Other info:</span>{' '}
            {post['Other info']}
          </p>
        </div>

        <div className="map-container mt-6">
          <iframe
            width="100%"
            height="350"
            className="rounded-md border border-gray-300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
