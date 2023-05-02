import React from "react";
import service1 from "../assests/images/services1.svg";
import service2 from "../assests/images/services2.svg";
import service3 from "../assests/images/services3.svg";

const Information = () => {
  return (
    <div className="bg-[#F15B43] w-full text-white flex flex-col items-center justify-between py-16">
      <p className="font-[Rubik] mb-4">Helping Today</p>
      <h1 className="font-['Jost'] font-bold text-5xl mb-8">
        How we help people
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-28 space-x-6">
        <div className="text-center flex flex-col items-center sm:max-w-[216px] mb-6">
          <img src={service1} alt="service 1" />
          <h1 className="font-[Rubik] font-bold text-2xl my-6">
            Pure Food & Water
          </h1>
          <p className="font-[Rubik]">
            Odio aliquet, fringilla odio eget, tincidunt nunc duis aliquet
            pulvinar ante employees and organizations to support.
          </p>
        </div>
        <div className="text-center flex flex-col items-center sm:max-w-[216px] mb-6">
          <img src={service2} alt="service 2" />
          <h1 className="font-[Rubik] font-bold text-2xl my-6">
            Health & Medicine
          </h1>
          <p className="font-[Rubik]">
            Odio aliquet, fringilla odio eget, tincidunt nunc duis aliquet
            pulvinar ante employees and organizations to support.
          </p>
        </div>
        <div className="text-center flex flex-col items-center sm:max-w-[216px] mb-6">
          <img src={service3} alt="service 3" />
          <h1 className="font-[Rubik] font-bold text-2xl my-6">Education</h1>
          <p className="font-[Rubik]">
            Odio aliquet, fringilla odio eget, tincidunt nunc duis aliquet
            pulvinar ante employees and organizations to support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
