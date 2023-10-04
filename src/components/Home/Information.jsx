import React from 'react';
import service1 from '../../assests/images/services1.svg';
import service2 from '../../assests/images/services2.svg';
import service3 from '../../assests/images/services3.svg';

const Information = () => {
  return (
    <div className="bg-[#F15B43] w-full text-white flex flex-col items-center justify-between py-8">
      <p className="font-[Rubik] mb-4">Helping Today</p>
      <h1 className="font-['Jost'] text-center font-bold text-4xl mb-3 md:mb-6">
        How we help people
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4 xs-1:px-28 space-x-2 xs-1:space-x-6">
        <div className="text-center flex flex-col items-center sm:max-w-[216px] mb-6">
          <img src={service1} className="h-30" alt="service 1" />
          <h1 className="font-[Rubik] font-bold text-xl my-2 md:my-6">
            Pure Food & Water
          </h1>
          <p className="font-[Rubik] text-sm md:text-base">
            Donating nonperishable food items to local food banks or homeless
            shelters, volunteering at a soup kitchen or food distribution
            center.
          </p>
        </div>
        <div className="text-center flex flex-col items-center sm:max-w-[216px] mb-6">
          <img src={service2} className="h-30" alt="service 2" />
          <h1 className="font-[Rubik] font-bold text-xl my-2 md:my-6">
            Health & Medicine
          </h1>
          <p className="font-[Rubik] text-sm md:text-base">
            Provide vital support for improving health and medical care, from
            providing access to healthcare, funding medical research and
            supporting patients and caregivers.
          </p>
        </div>
        <div className="text-center flex flex-col items-center sm:max-w-[216px] mb-6">
          <img src={service3} className="h-30" alt="service 3" />
          <h1 className="font-[Rubik] font-bold text-xl my-2 md:my-6">
            Education
          </h1>
          <p className="font-[Rubik] text-sm md:text-base">
            Donating to reputable charities that provide education resources,
            volunteering at local schools or community organizations, and
            advocating for policies that support underprivileged students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Information;
