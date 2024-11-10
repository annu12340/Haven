import Link from 'next/link';
import React from 'react';

interface CardProps {
  data: {
    _id: string;
    name: string;
    location: string;
    severity: string;
    issue: string;
    other_info: string;
    // add other properties of data if needed
  };
}

function Card({ data }: CardProps) {
  return (
    <Link
      href={`/post/${data._id}`}
      className="flex flex-col p-3 max-w-2xl w-full mx-auto border shadow-sm hover:scale-105 duration-200 cursor-pointer ease-in-out hover:shadow-md rounded-md"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg">{data.name}</h1>
        <p>{data.severity}</p>
      </div>
    </Link>
  );
}

export default Card;
