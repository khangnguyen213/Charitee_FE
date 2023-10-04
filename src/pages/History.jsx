import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Global from '../global';
import PaginationButtons from '../components/Global/PaginationButtons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const History = () => {
  const sessionRole = useSelector((state) => state.session.role);
  const accountID = useSelector((state) => state.session._id);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  const [donations, setDonations] = useState();
  const nPerPage = 10;

  useEffect(() => {
    if (accountID) {
      axios
        .get(`${Global.BASE_BACKEND_API}/donations`, {
          params: {
            accountID,
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
            navigate('/404');
          }
        });
    }
  }, [accountID, pageNumber, reload]);

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

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [pageNumber]);

  function formatDateMMYY(date) {
    // Extract the month and year from the date object
    var month = date.getMonth() + 1; // Add 1 because months start at index 0
    var year = date.getFullYear();

    // Pad the month with a leading zero if necessary
    if (month < 10) {
      month = '0' + month;
    }

    // Return the formatted string
    return month + '/' + year.toString().substr(-2);
  }

  return (
    <div className="flex flex-col pt-20">
      {sessionRole && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <h1 className="font-[Rubik] text-center py-4 lg:py-6 font-bold text-2xl lg:text-3xl">
              History
            </h1>

            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      className="font-[Jost] text-lg sm:text-xl px-2 sm:px-6 xl:px-2 py-1 sm:py-4"
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      colSpan={2}
                      className="font-[Jost] text-base sm:text-lg px-2 sm:px-6 xl:px-2 py-1 sm:py-4"
                    >
                      Cause
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base sm:text-lg px-2 sm:px-6 xl:px-2 py-1 sm:py-4"
                    >
                      Donator
                    </th>

                    <th
                      scope="col"
                      className="font-[Jost] text-base sm:text-lg px-2 sm:px-6 xl:px-2 py-1 sm:py-4"
                    >
                      Amount
                    </th>

                    <th
                      scope="col"
                      className="font-[Jost] text-base sm:text-lg px-2 sm:px-6 xl:px-2 py-1 sm:py-4"
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
                  {donations?.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-xl rounded-lg text-center p-12 font-bold font-[Jost] bg-[#F15B43] text-white"
                      >
                        LET'S MAKE YOUR FIRST DONATION
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
                            index % 2 === 0 ? 'bg-neutral-200' : 'bg-white'
                          } border-b items-center transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 dark:hover:text-white`}
                        >
                          <td className="whitespace-nowrap font-[Rubik] text-sm sm:text-base px-2 sm:px-6 xl:px-2 py-1 sm:py-4 font-medium">
                            <div className="flex flex-col items-center min-h-[1.5rem]">
                              <div>
                                {index + 1 + nPerPage * (pageNumber - 1)}
                              </div>
                            </div>
                          </td>
                          <td
                            colSpan={2}
                            className=" w-[200px] whitespace-normal font-[Rubik] text-sm sm:text-base px-2 sm:px-6 xl:px-2 py-1 sm:py-4"
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
                          <td className="w-[200px] whitespace-normal font-[Rubik] text-sm sm:text-base px-2 sm:px-6 xl:px-2 py-1 sm:py-4">
                            {donation.accountID.fullname}
                          </td>

                          <td className="lg:whitespace-nowrap xl:whitespace-normal  font-[Rubik] text-sm sm:text-base px-2 sm:px-6 xl:px-2 py-1 sm:py-4">
                            ${donation.amount}
                          </td>
                          <td className="hidden md-1:table-cell lg:whitespace-nowrap xl:whitespace-normal font-[Rubik] text-sm sm:text-base px-2 sm:px-6 xl:px-2 py-1 sm:py-4">
                            {donatedAt.toLocaleDateString('en-US')}
                          </td>
                          <td className="md-1:hidden lg:whitespace-nowrap xl:whitespace-normal font-[Rubik] text-sm sm:text-base px-2 sm:px-6 xl:px-2 py-1 sm:py-4">
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

export default History;
