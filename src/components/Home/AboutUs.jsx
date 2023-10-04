import React from 'react';
import about2 from '../../assests/images/about2.webp';

const AboutUs = (props) => {
  return (
    <div className="flex flex-row flex-wrap justify-between items-center w-full p-16">
      <div className="w-screen md:w-[30vw]">
        <span className="font-[Rubik] text-[#65C9BB] mb-4">About Us</span>
        <h1 className="font-['Jost'] font-bold text-4xl sm:text-5xl lg:text-6xl mb-8">
          We are tender heart charity foundation.
        </h1>
        <p className="font-['Rubik'] text-base sm:text-lg md:text-xl mb-8">
          When a child gets access to good food, it can change just about
          everything. Sed do eiusmod tempor incididunt dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation
        </p>
        <button
          onClick={() => {
            props.onScrollClick();
          }}
          className="bg-[#F15B43] rounded-2xl text-white py-4 px-8 flex items-center border-2 border-transparent hover:bg-transparent hover:border-[#F15B43] hover:text-[#F15B43] hover:font-bold duration-300 mb-8"
        >
          Discover More
        </button>
      </div>
      <img src={about2} alt="Our Team" className="w-screen md:w-[50vw] h-fit" />
    </div>
  );
};

export default AboutUs;
