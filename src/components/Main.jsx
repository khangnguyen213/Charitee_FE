import React from "react";
import img1 from "../assests/images/img1.png";

const Main = (props) => {
  return (
    <>
      <img
        src={img1}
        className="object-cover min-h-[90vh] sm:min-h-screen"
        alt="banner"
      />
      <div className="text-white absolute left-[10%] top-[30%] w-[80vw] sm:w-[56vw] sm:min-w-[350px] md:w-[35vw]">
        <h1 className="font-['Jost'] font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 md:mb-7 lg:mb-10">
          Give a helping hand to those who need it!
        </h1>
        <p className="font-['Rubik'] text-base sm:text-lg md:text-xl mb-5 md:mb-7 lg:mb-10">
          When a child gets access to good food, it can change just about
          everything.
        </p>
        <button
          onClick={() => {
            props.onScrollClick();
          }}
          className="bg-[#65C9BB] px-10 py-5 hover:bg-transparent border border-transparent hover:border-white duration-300"
        >
          Ongoing Programs
        </button>
      </div>
    </>
  );
};

export default Main;
