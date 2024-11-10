import Image from 'next/image';
import React from 'react';
import banner from '../assets/banner.png';

function Header() {
  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
      <div className="flex items-center  mt-12 gap-32">
        <div className="flex flex-col gap-5">
          <h1 className="font-extrabold text-[40px] text-gray-800">
            Empower Your Support Experience with{' '}
            <span className="text-blue-700">SupportSafe</span>
          </h1>
          <p className="text-[20px] text-gray-600 leading-relaxed">
            At SupportSafe, we&apos;re dedicated to ensuring every issue gets
            the attention it deserves. Easily create support tickets, monitor
            real-time updates, and even help resolve community tickets. Your
            support journey starts here, and we&apos;re with you every step of
            the way! 🚀
          </p>

          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-lg text-white rounded-lg shadow-md transform hover:scale-105 duration-200 ease-in-out font-semibold">
              Register
            </button>
            <button className="px-6 py-3 text-lg text-blue-700 rounded-lg border border-blue-700 shadow-md transform hover:scale-105 hover:bg-blue-700 hover:text-white duration-200 ease-in-out font-semibold">
              Report Now
            </button>
          </div>
        </div>
        <Image
          src={banner}
          width={500}
          height={500}
          alt="banner"
          className="scale-x-[-1]"
        />
      </div>
    </div>
  );
}

export default Header;
