import React, { useState, useEffect } from "react";
import axios from "axios";
import Global from "../global";
import PaginationButtons from "../components/PaginationButtons";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";
import { usePageNumber } from "../hooks/usePageNumber";

const AccountsManager = () => {
  const sessionRole = useSelector((state) => state.session.role);
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(true);
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState();
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
      .get(`${Global.BASE_BACKEND_API}/account`, {
        params: {
          keyword: search,
          pageNumber: pageNumber,
          nPerPage,
        },
        withCredentials: true,
      })
      .then((res) => {
        setAccounts(res.data.accounts);
        setTotalPage(res.data.totalPage);
        setReload(false);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/404");
        }
      });
  }, [search, pageNumber, reload]);

  const searchClickHandler = (e) => {
    e.preventDefault();
    setPageNumber(1);
    setSearch(e.target[0].value);
  };

  const singleDeleteHandler = (accountID, role) => {
    if (role === "user") {
      axios
        .post(`${Global.BASE_BACKEND_API}/account/delete`, [accountID], {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alertify.success("Success", 1, function () {
              setAccounts((accounts) =>
                accounts.filter((account) => account._id !== accountID)
              );
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate("/404");
          }
          alertify.error("Error");
        });
    } else {
      alertify.alert("Notification", "Only user can be deleted");
    }
  };

  const changeRoleHandler = (accountID, role) => {
    axios
      .post(
        `${Global.BASE_BACKEND_API}/account/change-role`,
        {
          accountID: accountID,
          role: role,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          setReload(true);
          alertify.success("Updated");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alertify.alert("Update Role Failed", "Only MASTER can change role");
        }
        if (err.response.status === 403) {
          navigate("/404");
          alertify.alert("Update Role Failed", err.response.data);
        }
      });
  };

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [pageNumber]);

  return (
    <div className="flex flex-col pt-36 sm:pt-20">
      {["admin", "master"].includes(sessionRole) && (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <h1 className="font-[Rubik] text-center py-4 lg:py-6 font-bold text-2xl lg:text-3xl">
              Accounts Manager
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
                  placeholder="Search by email, name or phone number "
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
            </div>
            {/* Search */}
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      scope="col"
                      className="font-[Jost] text-lg md:text-xl px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      #
                    </th>

                    <th
                      scope="col"
                      className="font-[Jost] xl:w-[200px] text-base md:text-lg px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      Full name
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      Phone number
                    </th>

                    <th
                      scope="col"
                      className="hidden sm:table-cell font-[Jost] text-base md:text-lg px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="font-[Jost] text-base md:text-lg px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!accounts && (
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
                  {accounts &&
                    accounts.map((account, index) => {
                      return (
                        <tr
                          key={account._id}
                          className={`${
                            index % 2 === 0 ? "bg-neutral-200" : "bg-white"
                          } border-b items-center transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 dark:hover:text-white`}
                        >
                          <td className="whitespace-nowrap font-[Rubik] text-sm md-2:text-base px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4 font-medium">
                            <div className="flex flex-col items-center min-h-[1.5rem]">
                              <div>
                                {index + 1 + nPerPage * (pageNumber - 1)}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-normal font-[Rubik] text-sm md-2:text-base px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4">
                            {account.email.split("@")[0]} @
                            {account.email.split("@")[1]}
                          </td>
                          <td className="whitespace-normal xl:w-[200px] font-[Rubik] text-sm md-2:text-base px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4">
                            {account.fullname}
                          </td>
                          <td className="whitespace-normal xl:w-[200px] font-[Rubik] text-sm md-2:text-base px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4">
                            {account.phone}
                          </td>
                          <td className="hidden sm:table-cell whitespace-normal xl:w-[200px] font-[Rubik] text-sm md-2:text-base px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4">
                            {account.address}
                          </td>
                          <td className="whitespace-normal xl:w-[200px] font-[Rubik] text-sm md-2:text-base px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4">
                            {account.role === "admin" && (
                              <p className="bg-[#F15B43] md-2:text-lg p-2  text-white w-fit rounded-lg ">
                                {account.role}
                              </p>
                            )}

                            {account.role === "master" && (
                              <p className="bg-[#000000] md-2:text-lg p-2  text-white w-fit rounded-lg ">
                                {account.role}
                              </p>
                            )}
                            {account.role === "user" && (
                              <p className=" p-2 md-2:text-lg w-fit rounded-lg bg-gray-500 text-white">
                                {account.role}
                              </p>
                            )}
                          </td>
                          <td className="whitespace-nowrap font-[Rubik]  px-2 md-2:px-6 xl:px-2 py-1 sm:py-3 md-2:py-4">
                            <div className="flex flex-col">
                              <button
                                className="bg-[#F15B43] rounded-md mb-2 py-1 sm:py-2 md-2:py-4 px-2 md:px-8 
                            text-white text-xs sm:text-sm font-bold items-center border border-transparent 
                            hover:bg-transparent  hover:border-white duration-300"
                                onClick={() => {
                                  if (account.role === "master") {
                                    alertify.alert(
                                      "Update Role Failed",
                                      "Role MASTER can't be changed this way"
                                    );
                                  } else {
                                    alertify.confirm(
                                      "Notification",
                                      `Confirm to change ${
                                        account.fullname
                                      }'s role to ${
                                        account.role === "admin"
                                          ? "USER"
                                          : "ADMIN"
                                      }?`,
                                      function () {
                                        changeRoleHandler(
                                          account._id,
                                          account.role
                                        );
                                      },
                                      function () {
                                        alertify.error("Cancel");
                                      }
                                    );
                                  }
                                }}
                              >
                                Change Role
                              </button>
                              <button
                                className={`bg-[#263B5C] rounded-md py-1 sm:py-2 md-2:py-4 px-2 md:px-8 
                              text-white text-xs sm:text-sm font-bold items-center border border-transparent 
                              hover:bg-transparent hover:border-white duration-300 `}
                                onClick={() =>
                                  alertify.confirm(
                                    "Notification",
                                    "Delete Account? (Only user can be deleted)",
                                    function () {
                                      singleDeleteHandler(
                                        account._id,
                                        account.role
                                      );
                                    },
                                    function () {
                                      alertify.error("Cancel");
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
                {accounts && (
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

export default AccountsManager;
