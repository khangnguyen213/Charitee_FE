import React, { useEffect } from "react";
import logo from "../assests/images/logo.webp";
import { AiFillHeart } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DropdownButton from "./DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Global from "../global";
import { login, logout } from "../redux/sessionSlice";
import ListButton from "./ListButton";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionRole = useSelector((state) => state.session.role);
  const registerClickHandler = () => {
    navigate("/signup");
  };
  const homeClickHandler = () => {
    navigate("/");
  };
  const exploreClickHandler = () => {
    navigate("/explore");
  };
  useEffect(() => {
    axios
      .get(`${Global.BASE_BACKEND_API}/account/check-session`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(login(res.data));
        }
      })
      .catch((err) => {
        if (sessionRole && sessionRole !== "") {
          dispatch(logout());
        }
      });
  }, []);
  return (
    <div className="fixed top-0 left-0 bg-[#263B5C] w-screen text-white font-['Rubik'] flex flex-row flex-wrap items-center justify-between px-8 py-2 z-50">
      <div className="flex flex-row">
        <img
          src={logo}
          alt="logo"
          onClick={homeClickHandler}
          className="cursor-pointer h-6 xs-1:h-8"
        />
        <button
          className="hidden xs-0:block font-[Jost] text-base xs-1:text-xl ml-4 sm:ml-8"
          onClick={exploreClickHandler}
        >
          Explore
        </button>
        <button
          className="block xs-0:hidden font-[Jost] text-base xs-1:text-xl ml-4 sm:ml-8"
          onClick={exploreClickHandler}
        >
          <BsSearchHeartFill />
        </button>
      </div>

      <div>
        {(sessionRole === "user" ||
          sessionRole === "master" ||
          sessionRole === "admin") && <DropdownButton />}
        {(sessionRole === "user" ||
          sessionRole === "master" ||
          sessionRole === "admin") && <ListButton />}
        {sessionRole !== "user" &&
          sessionRole !== "master" &&
          sessionRole !== "admin" && (
            <div className="flex flex-row text-sm sm:text-base">
              <button
                className="hidden xs-0:block mr-4"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                onClick={registerClickHandler}
                className="hidden sm:flex bg-[#F15B43] py-2 px-8 items-center hover:bg-transparent border border-transparent hover:border-white duration-300"
              >
                <AiFillHeart className="inline-block text-xl" />{" "}
                <span className="pl-2">Register To Donate Now</span>
              </button>
              <button
                onClick={registerClickHandler}
                className="flex sm:hidden bg-[#F15B43] py-1 sm:py-2 px-4 sm:px-8 items-center hover:bg-transparent border border-transparent hover:border-white duration-300"
              >
                <span className="pl-2">Register</span>
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default NavBar;
