import React from "react";
import logo from "../assests/images/logo.webp";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const registerClickHandler = () => {
    navigate("/signup");
  };
  const homeClickHandler = () => {
    navigate("/");
  };
  const exploreClickHandler = () => {
    navigate("/explore");
  };
  return (
    <div className="fixed top-0 left-0 bg-[#263B5C] w-screen text-white font-['Rubik'] flex flex-row flex-wrap items-center justify-between px-8 py-3 z-50">
      <div className="flex flex-row">
        <img
          src={logo}
          alt="logo"
          onClick={homeClickHandler}
          className="cursor-pointer"
        />
        <button
          className="font-[Jost] hover:font-bold duration-300 text-xl ml-8"
          onClick={exploreClickHandler}
        >
          Explore
        </button>
      </div>

      <div>
        <button
          onClick={registerClickHandler}
          className="bg-[#F15B43] py-4 px-8 flex items-center hover:bg-transparent border border-transparent hover:border-white duration-300"
        >
          <AiFillHeart className="inline-block text-xl" />{" "}
          <span className="pl-2">Register To Donate Now</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
