import Image from 'next/image';
import React from 'react';
import banner from '../assets/banner.png';

function Header() {
  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
      <div className="flex items-center  mt-12 gap-32">
        <Image src={banner} width={500} height={500} alt="banner" />
        <div className="flex flex-col gap-5">
          <h1 className="font-extrabold text-[40px]">
            Welcome to Support<span className="text-blue-700">Safe</span>
          </h1>
          <p className="text-[20px]">
            SupportSafe is a platform that allows you to create a support ticket
            and track the progress of your issue. You can also view the status
            of other tickets and help resolve them. We are here to help you! 🚀
          </p>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-blue-700 text-lg text-white rounded-lg tracking-wide hover:bg-white hover:text-blue-700 border border-blue-700 duration-200 ease-in-out font-semibold">
              Register
            </button>
            <button className="p-3 text-lg text-black rounded-lg tracking-wide border border-blue-700 hover:bg-blue-700 hover:text-white duration-200 ease-in-out font-semibold">
              Report Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
