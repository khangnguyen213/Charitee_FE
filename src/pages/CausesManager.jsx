import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Global from '../global';
import PaginationButtons from '../components/PaginationButtons';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { usePageNumber } from '../hooks/usePageNumber';
import NotFoundPage from './NotFoundPage';

const CausesManager = () => {
  const sessionRole = useSelector((state) => state.session.role);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [selectedCauses, setSelectedCauses] = useState([]);
  const [causes, setCauses] = useState();
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
      })
      .catch((err) => {
        alertify.alert(err.response.statusText);
        if (err.response.status === 403) {
          navigate('/404');
        }
      });
  }, [search, pageNumber]);

  const searchClickHandler = (e) => {
    e.preventDefault();
    setPageNumber(1);
    setSearch(e.target[0].value);
  };

  const selectCauseHandler = (causeID) => {
    setSelectedCauses((prevState) => {
      const causes = prevState.filter((cause) => cause !== causeID);
      causes.push(causeID);
      return causes;
    });
  };
  const unselectCauseHandler = (causeID) => {
    setSelectedCauses((prevState) => {
      const causes = prevState.filter((cause) => cause !== causeID);
      return causes;
    });
  };
  const confirmDeleteHandler = () => {
    if (
      causes.filter(
        (cause) => selectedCauses.includes(cause._id) && cause.raised > 0
      ).length > 0
    ) {
      alertify.error('Item(s) have already launched cannot be deleted');
    } else {
      axios
        .post(`${Global.BASE_BACKEND_API}/cause/delete`, selectedCauses, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alertify.success('Success', 1, function () {
              setCauses((causes) =>
                causes.filter((cause) => !selectedCauses.includes(cause._id))
              );
              setSelectedCauses([]);
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate('/404');
            alertify.error('Forbidden');
          }
        });
    }
  };

  const singleDeleteHandler = (causeID, raised) => {
    if (raised > 0) {
      alertify.error('Item(s) have already launched cannot be deleted');
    } else {
      axios
        .post(`${Global.BASE_BACKEND_API}/cause/delete`, [causeID], {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alertify.success('Success', 1, function () {
              setCauses((causes) =>
                causes.filter((cause) => cause._id !== causeID)
              );
              setSelectedCauses((causes) =>
                causes.filter((cause) => cause._id !== causeID)
              );
            });
          }
        })
        .catch((err) => alertify.error('Error'));
    }
  };

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [pageNumber]);

  return (
    <>
      {['admin', 'master'].includes(sessionRole) && (
        <div className="flex flex-col pt-36 sm:pt-20">
          {selectedCauses.length > 0 && (
            <div className="fixed z-50 flex justify-between bottom-0 left-0 right-0 p-2 bg-[#F15B43] text-white font-['Rubik']">
              <div className="my-auto">
                Selected Causes: {selectedCauses.length} item(s)
              </div>
              <div>
                <button
                  onClick={() =>
                    alertify.confirm(
                      'Notification',
                      'Delete Selected Item(s)? (Only causes have not been donated (Raised = $0) that can be deleted)',
                      confirmDeleteHandler,
                      function () {
                        alertify.error('Cancel');
                      }
                    )
                  }
                  className="px-2 py-1 bg-[#263B5C] text-base hover:opacity-50"
                >
                  Delete
                </button>
                <button
                  className="px-2 py-1 text-sm hover:opacity-50"
                  onClick={() => setSelectedCauses([])}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <h1 className="font-[Rubik] text-center py-4 lg:py-6 font-bold text-2xl lg:text-3xl">
                Causes Manager
              </h1>
              {/* Search */}
              <div className="mb-3 w-full flex flex-row justify-between">
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
                    className="relative z-[2] bg-[#F15B43] text-white font-medium hover:font-bold hover:bg-transparent hover:text-[#F15B43] rounded-r border-2 border-[#F15B43] px-6 py-2 text-sm uppercase transition duration-150 ease-in-out"
                    type="submit"
                    id="button-addon3"
                    data-te-ripple-init
                  >
                    Search
                  </button>
                </form>
                <button
                  className="rounded-md hidden md:block relative z-[2] h-fit py-2 bg-[#F15B43] text-white hover:text-[#F15B43] font-medium hover:font-bold hover:bg-transparent hover:text-[#F15B43 border-2 border-[#F15B43] px-6 text-sm uppercase transition duration-150 ease-in-out"
                  onClick={() => navigate('/admin/causes/create')}
                >
                  Add Cause
                </button>
                <button
                  className="rounded-md block ml-2 md:hidden relative z-[2] h-fit py-2 bg-[#F15B43] text-white hover:text-[#F15B43] font-medium hover:font-bold hover:bg-transparent hover:text-[#F15B43 border-2 border-[#F15B43] px-6 text-sm uppercase transition duration-150 ease-in-out"
                  onClick={() => navigate('/admin/causes/create')}
                >
                  Add
                </button>
              </div>
              {/* Search */}
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        scope="col"
                        className="font-[Jost] text-lg md:text-xl px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="font-[Jost]  text-base md:text-lg hidden xl:table-cell px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="font-[Jost] xl:w-[200px] text-base md:text-lg px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        Goal
                      </th>
                      <th
                        scope="col"
                        className="hidden sm:table-cell font-[Jost] text-base md:text-lg px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        Finish At
                      </th>
                      <th
                        scope="col"
                        className="font-[Jost] text-base md:text-lg px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {!causes && (
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
                    {causes &&
                      causes.map((cause, index) => {
                        const createdAt = new Date(cause.createdAt);
                        const finishAt = new Date(cause.finishAt);
                        return (
                          <tr
                            key={cause._id}
                            className={`${
                              index % 2 === 0 ? 'bg-neutral-200' : 'bg-white'
                            } border-b items-center transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 dark:hover:text-white`}
                          >
                            <td className="whitespace-nowrap font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4 font-medium">
                              <div className="flex flex-col items-center min-h-[1.5rem]">
                                <div>
                                  <input
                                    className="h-[1.125rem] text-black bg-white w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="checkbox"
                                    id={`checkbox${cause._id}`}
                                    checked={selectedCauses.includes(cause._id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        selectCauseHandler(cause._id);
                                      } else {
                                        unselectCauseHandler(cause._id);
                                      }
                                    }}
                                  />
                                </div>
                                <div>
                                  {' '}
                                  {index + 1 + nPerPage * (pageNumber - 1)}
                                </div>
                              </div>
                            </td>
                            <td className="hidden xl:table-cell whitespace-nowrap font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              <img
                                src={cause.image}
                                alt={cause.title}
                                className="w-[380px] h-auto"
                              />
                            </td>
                            <td className="lg:whitespace-nowrap xl:whitespace-normal xl:w-[200px] font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              <div>
                                <p>{cause.title}</p>

                                <span
                                  className={`inline-block whitespace-nowrap rounded-full ${
                                    cause.status !== 'finished'
                                      ? 'bg-success-800'
                                      : 'bg-[#F15B43]'
                                  }  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-neutral-50`}
                                >
                                  {cause.status}
                                </span>
                                {new Date() > new Date(cause?.finishAt) && (
                                  <span className="border border-danger-700 inline-block whitespace-nowrap rounded-full bg-danger-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-danger-700">
                                    Overdue
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="hidden sm:table-cell lg:whitespace-nowrap font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              ${cause.raised}/{cause.goal}
                            </td>
                            <td className="sm:hidden lg:whitespace-nowrap font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              ${cause.goal}
                            </td>
                            <td className="hidden sm:table-cell whitespace-nowrap font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              {createdAt.toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap font-[Rubik] text-sm md:text-base px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              {finishAt.toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap font-[Rubik]  px-2 sm:px-4 md:px-6 xl:px-2 py-1 sm:py-3 md:py-4">
                              <div className="flex flex-col">
                                <button
                                  onClick={() =>
                                    navigate(`/admin/causes/${cause._id}`)
                                  }
                                  className="bg-[#F15B43] rounded-md mb-2 py-1 sm:py-2 md:py-4 sm:px-4 px-2 md:px-8 
                            text-white text-xs sm:text-sm font-bold items-center border border-transparent 
                            hover:bg-transparent  hover:border-white duration-300"
                                >
                                  Edit
                                </button>
                                <button
                                  className={`bg-[#263B5C] rounded-md py-1 sm:py-2 md:py-4 sm:px-4 px-2 md:px-8 
                              text-white text-xs sm:text-sm font-bold items-center border border-transparent 
                              hover:bg-transparent hover:border-white duration-300 ${
                                cause.raised > 0 ? 'cursor-not-allowed' : ''
                              }`}
                                  onClick={() =>
                                    alertify.confirm(
                                      'Notification',
                                      'Delete Selected Item(s)? (Only causes have not been donated (Raised = $0) that can be deleted)',
                                      function () {
                                        singleDeleteHandler(
                                          cause._id,
                                          cause.raised
                                        );
                                      },
                                      function () {
                                        alertify.error('Cancel');
                                      }
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="w-full">
                  {causes && (
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
        </div>
      )}
      {!['admin', 'master'].includes(sessionRole) && <NotFoundPage />}
    </>
  );
};

export default CausesManager;
