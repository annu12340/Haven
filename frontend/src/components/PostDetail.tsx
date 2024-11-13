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
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyA3WfS4xHpoAkcSm2pCGTpd_tfd0xdqmuE&q=${lat},${lng}`;

  return (
    <div className="h-full">
      <h1 className="text-black">{post.Name}</h1>
      <p>Status: {post.status}</p>
      <p>Preferred way of contact: {post['Preferred way of contact']}</p>
      <p>
        Relationship with perpetrator: {post['Relationship with perpetrator']}
      </p>
      <p>Contact: {post['Contact info']}</p>
      <p>Frequency: {post['Frequency of domestic violence']}</p>
      <p>{post['Nature of domestic violence']}</p>
      <p>Severity: {post['Severity of domestic violence']}</p>
      <p>Location: {city ? `${city} (${post.Location})` : `Loading city...`}</p>
      <p>Other info: {post['Other info']}</p>

      <div className="map-container" style={{ marginTop: '20px' }}>
        <iframe
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
        ></iframe>
      </div>
    </div>
  );
}

export default PostDetail;
