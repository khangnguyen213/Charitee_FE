import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Global from "../global";
import PaginationButtons from "../components/PaginationButtons";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

const Explore = () => {
  const session = useSelector((state) => state.session);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [causes, setCauses] = useState();
  const nPerPage = 10;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${Global.BASE_BACKEND_API}/cause`, {
        params: {
          keyword: search,
          pageNumber: pageNumber,
          nPerPage,
        },
        withCredentials: true,
      })
      .then((res) => {
        setCauses(res.data.causes);
        setTotalPage(res.data.totalPage);
        setIsLoading(false);
      });
  }, [search, pageNumber]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    setPageNumber(1);
    setSearch(e.target[0].value);
  };

  const prevPageHandler = () => {
    if (pageNumber > 1) {
      setPageNumber((prevState) => --prevState);
    }
  };
  const nextPageHandler = () => {
    if (pageNumber < totalPage) {
      setPageNumber((prevState) => ++prevState);
    }
  };
  const customPageHandler = (page) => {
    setPageNumber(page);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}

      <div className="sm:container my-44 sm:my-24 px-6 mx-auto duration-200">
        {window.scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        <section className="mb-32 text-gray-800 text-center md:text-left">
          <h2 className="font-[Jost] text-3xl sm:text-4xl font-bold mb-6 text-center duration-200">
            Explore Causes
          </h2>
          {/* Search */}
          <div className="mb-3">
            <form
              onSubmit={searchClickHandler}
              className="relative mb-4 flex w-full md:w-1/2 flex-wrap items-stretch"
            >
              <input
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-slate-800 hover:border-[#F15B43] focus:border-[#F15B43] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-lg font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon3"
              />

              <button
                className="relative z-[2] bg-[#F15B43] text-white font-medium hover:font-bold hover:bg-transparent hover:text-[#F15B43] rounded-r border border-[#F15B43] px-6 py-2 text-sm uppercase transition duration-150 ease-in-out"
                type="submit"
                id="button-addon3"
                data-te-ripple-init
              >
                Search
              </button>
            </form>
          </div>
          {/* Search */}

          {causes &&
            causes.map((cause) => {
              const finishAt = new Date(cause.finishAt);
              return (
                <div
                  key={cause._id}
                  className="flex flex-wrap mb-6 px-2 py-2 md:py-4 sm:py-6 border-b-2 border-slate-400"
                >
                  <div className="self-center grow-0 shrink-0 basis-auto w-full md:w-5/12 xl:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
                    <div
                      className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={cause.image}
                        className="inline w-full"
                        alt={cause.title}
                      />
                      <button
                        onClick={
                          session._id !== ""
                            ? () => navigate(`/donate/${cause._id}`)
                            : () => navigate("/login")
                        }
                      >
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.2)",
                          }}
                        ></div>
                      </button>
                    </div>
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-full md:w-7/12 xl:w-9/12 px-3 mb-6 md:mb-0 mr-auto">
                    <h5
                      className="text-xl font-bold mb-3 cursor-pointer hover:opacity-60"
                      onClick={
                        session._id !== ""
                          ? () => navigate(`/donate/${cause._id}`)
                          : () => navigate("/login")
                      }
                    >
                      {cause.title}
                    </h5>
                    <div className="mb-3 text-yellow-500 font-medium text-base flex items-center justify-center md:justify-start">
                      <svg
                        className="w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M608 64H32C14.33 64 0 78.33 0 96v320c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V96c0-17.67-14.33-32-32-32zM48 400v-64c35.35 0 64 28.65 64 64H48zm0-224v-64h64c0 35.35-28.65 64-64 64zm272 176c-44.19 0-80-42.99-80-96 0-53.02 35.82-96 80-96s80 42.98 80 96c0 53.03-35.83 96-80 96zm272 48h-64c0-35.35 28.65-64 64-64v64zm0-224c-35.35 0-64-28.65-64-64h64v64z"
                        />
                      </svg>
                      Goal: ${cause.goal}
                    </div>
                    <p className="text-gray-500 mb-6">
                      <small>
                        End at <u>{finishAt.toLocaleDateString()}</u>
                      </small>
                    </p>
                    <div className="w-full bg-[#e7a095] text-white font-bold mb-4">
                      <div
                        className="bg-[#F15B43] p-2 text-center text-xs font-medium leading-none text-primary-100"
                        style={{
                          width: `${Math.floor(
                            (cause.raised * 100) / cause.goal
                          )}%`,
                        }}
                      >
                        {Math.floor((cause.raised * 100) / cause.goal)}%
                      </div>
                    </div>
                    <p className="text-gray-500 text-justify">
                      {truncateString(cause.description, 250)}
                    </p>
                    <button
                      onClick={
                        session._id !== ""
                          ? () => navigate(`/donate/${cause._id}`)
                          : () => navigate("/login")
                      }
                      className="rounded-md font-[Rubik] bg-[#F15B43] text-white hover:text-[#F15B43] flex items-center hover:bg-transparent border-2 border-transparent hover:border-[#F15B43] transition duration-150 ease-in-out  py-2 md:py-4 float-right justify-center w-full mt-3 sm:w-fit sm:px-8   "
                    >
                      <span className="pl-2">Donate</span>
                    </button>
                  </div>
                </div>
              );
            })}
          {causes && (
            <PaginationButtons
              pageNumber={pageNumber}
              totalPage={totalPage}
              onPrevPage={prevPageHandler}
              onNextPage={nextPageHandler}
              onCustomPage={customPageHandler}
            />
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
