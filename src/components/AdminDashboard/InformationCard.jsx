import React from 'react';
import { FaFontAwesomeAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { AiOutlineTransaction, AiOutlineTeam } from 'react-icons/ai';

const InformationCard = (props) => {
  return (
    <div
      className={`flex flex-col text-white font-['Rubik'] p-4 my-2 rounded-md w-[45%] md-2:w-[22%] ${props.configStyle}`}
    >
      <div className="flex justify-between w-full">
        <h1 className="text-xs xs:text-base xs-1:text-lg">{props.title}</h1>
        <div className="text-xl xs:text-3xl xs-1:text-5xl">{props.icon}</div>
      </div>
      <h2 className="text-sm xs:text-lg xs-1:text-2xl font-bold">
        {props.data}
      </h2>
    </div>
  );
};

const InformationCards = (props) => {
  return (
    <div className="w-full flex flex-row flex-wrap justify-around md-2:justify-between my-4">
      {props.data && (
        <>
          <InformationCard
            title={'Users'}
            data={props.data.countAccount}
            icon={<AiOutlineTeam />}
            configStyle="bg-red-500"
          />
          <InformationCard
            title={'Causes'}
            data={props.data.countCause}
            icon={<FaFontAwesomeAlt />}
            configStyle="bg-yellow-500"
          />
          <InformationCard
            title={'Donations'}
            data={props.data.countDonation}
            icon={<AiOutlineTransaction />}
            configStyle="bg-emerald-500"
          />
          <InformationCard
            title={'Raised Fund'}
            data={props.data.totalDonation}
            icon={<FaRegMoneyBillAlt />}
            configStyle="bg-sky-500"
          />
        </>
      )}
    </div>
  );
};

export default InformationCards;
