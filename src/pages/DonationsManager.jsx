import React, { useState, useEffect } from "react";
import axios from "axios";
import Global from "../global";
import PaginationButtons from "../components/PaginationButtons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePageNumber } from "../hooks/usePageNumber";

const DonationsManager = () => {
  const sessionRole = useSelector((state) => state.session.role);
  const [causeSearch, setCauseSearch] = useState("");
  const [donatorSearch, setDonatorSearch] = useState("");
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();
  const [donations, setDonations] = useState();
  const {
    totalPage,
    setTotalPage,
    pageNumber,
    setPageNumber,
    prevPageHandler,
    nextPageHandler,
    customPageHandler,
  } = usePageNumber();
  const nPerPage = 10;

  useEffect(() => {
    axios
      .get(`${Global.BASE_BACKEND_API}/donations`, {
        params: {
          causeSearch,
          donatorSearch,
          pageNumber: pageNumber,
          nPerPage,
        },
        withCredentials: true,
      })
      .then((res) => {
        setDonations(res.data.results);
        setTotalPage(res.data.totalPage);
        setReload(false);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/404");
        }
      });
  }, [causeSearch, donatorSearch, pageNumber, reload]);

  const searchClickHandler = (e) => {
    e.preventDefault();
    setPageNumber(1);
    setCauseSearch(e.target[0].value);
    setDonatorSearch(e.target[1].value);
  };

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [pageNumber]);

  function formatDateMMYY(date) {
    // Extract the month and year from the date object
    var month = date.getMonth() + 1; // Add 1 because months start at index 0
    var year = date.getFullYear();

    // Pad the month with a leading zero if necessary
    if (month < 10) {
      month = "0" + month;
    }

    // Return the formatted string
    return month + "/" + year.toString().substr(-2);
  }

  return (
    <div className="flex flex-col pt-36 sm:pt-20">
      {["admin", "master"].includes(sessionRole) && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <h1 className="font-[Rubik] text-center py-4 lg:py-6 font-bold text-2xl lg:text-3xl">
              Donations Manager
            </h1>
            {/* Search */}
            <div className="mb-3 w-full flex flex-row justify-between">
              <form
                onSubmit={searchClickHandler}
                className="relative mb-4 flex w-full md:w-1/2 flex-wrap items-stretch"
              >
                <input
                  type="text"
                  className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-slate-800 hover:border-[#F15B43] focus:border-[#F15B43] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-lg font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:outline-none"
                  placeholder="Search by cause"
                />
                <input
                  type="text"
                  className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto border-t border-b border-slate-800 hover:border-[#F15B43] focus:border-[#F15B43] bg-transparent bg-clip-padding px-3 py-[0.25rem] text-lg font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:outline-none"
                  placeholder="Search by donator"
                />
                <button
                  className="relative z-[2] bg-[#F15B43] text-white font-medium hover:font-bold hover:bg-transparent hover:text-[#F15B43] rounded-r border-2 border-[#F15B43] px-6 py-2 text-sm uppercase transition duration-150 ease-in-out"
                  type="submit"
                  id="button-addon3"
                  data-te-ripple-init
                >
                  Search
                </button>
              </form>
            </div>
            {/* Search */}
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      className="font-[Jost] text-lg md:text-xl px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      colSpan={2}
                      className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                    >
                      Cause
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                    >
                      Donator
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                    >
                      Amount
                    </th>

                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!donations && (
                    <tr>
                      <td colSpan="7" className="text-center p-12">
                        <div
                          className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
                          role="status"
                        >
                          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {donations &&
                    donations.map((donation, index) => {
                      const donatedAt = new Date(donation.donatedAt);

                      return (
                        <tr
                          key={donation._id}
                          className={`${
                            index % 2 === 0 ? "bg-neutral-200" : "bg-white"
                          } border-b items-center transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 dark:hover:text-white`}
                        >
                          <td className="whitespace-nowrap font-[Rubik] text-sm md-1:text-base px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4 font-medium">
                            <div className="flex flex-col items-center min-h-[1.5rem]">
                              <div>
                                {index + 1 + nPerPage * (pageNumber - 1)}
                              </div>
                            </div>
                          </td>
                          <td
                            colSpan={2}
                            className=" w-[200px] whitespace-normal  font-[Rubik] text-sm md-1:text-base px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4"
                          >
                            <p
                              onClick={() =>
                                navigate(`/donate/${donation.causeID._id}`)
                              }
                              className="w-fit ease-in cursor-pointer hover:bg-[#F15B43] rounded-xl p-2"
                            >
                              {donation.causeID.title}
                            </p>
                          </td>
                          <td className="lg:whitespace-nowrap xl:whitespace-normal font-[Rubik] text-sm md-1:text-base px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4">
                            {donation.accountID.fullname}
                          </td>
                          <td className="lg:whitespace-nowrap xl:whitespace-normal font-[Rubik] text-sm md-1:text-base px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4">
                            {donation.accountID.email.split("@")[0]} @
                            {donation.accountID.email.split("@")[1]}
                          </td>
                          <td className="lg:whitespace-nowrap xl:whitespace-normal  font-[Rubik] text-sm md-1:text-base px-2 text-center sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4">
                            ${donation.amount}
                          </td>
                          <td className="hidden md-1:table-cell lg:whitespace-nowrap xl:whitespace-normal font-[Rubik] text-sm md-1:text-base px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4">
                            {donatedAt.toLocaleDateString("en-US")}
                          </td>
                          <td className="md-1:hidden lg:whitespace-nowrap xl:whitespace-normal font-[Rubik] text-sm md-1:text-base px-2 sm:px-4 md-1:px-6 xl:px-2 py-1 sm:py-3 md-1:py-4">
                            {formatDateMMYY(donatedAt)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="w-full">
                {donations && (
                  <PaginationButtons
                    pageNumber={pageNumber}
                    totalPage={totalPage}
                    onPrevPage={prevPageHandler}
                    onNextPage={nextPageHandler}
                    onCustomPage={customPageHandler}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationsManager;
