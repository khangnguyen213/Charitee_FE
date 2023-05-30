import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import avtPlaceholder from "../assests/images/avtPlaceholder.png";
import AlertMessage from "../components/AlertMessage";
import axios from "axios";
import Global from "../global";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";

const Account = () => {
  const [errorAuth, setErrAuth] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSelector((state) => state.session);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    alertify.confirm(
      "Notification",
      "Update account?",
      function () {
        setIsLoading(true);

        axios
          .put(`${Global.BASE_BACKEND_API}/account/${session._id}`, data, {
            withCredentials: true,
          })
          .then(() => {
            setIsLoading(false);
            alertify.success("Updated");
          })
          .catch((error) => {
            setIsLoading(false);
            setErrAuth(error.response.data);
          });
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };
  useEffect(() => {
    if (session._id !== "") {
      axios
        .get(`${Global.BASE_BACKEND_API}/account`, {
          params: { accountID: session._id },
          withCredentials: true,
        })
        .then((res) => {
          const accountData = res.data.accounts[0];
          setValue("email", accountData.email);
          setValue("fullname", accountData.fullname);
          setValue("phone", accountData.phone);
          setValue("address", accountData.address);
          setValue("role", accountData.role);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate("/404");
          }
        });
    }
  }, [session, isUpdate]);
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="font-[Rubik] h-fit min-h-screen px-[4vw] xl:px-[7vw] pt-44 sm:pt-20">
        {session._id !== "" && (
          <div>
            <h1 className="font-[Jost] font-bold text-3xl sm:text-4xl py-6">
              {isUpdate ? "Update Information" : "Account Information"}
            </h1>
            {errorAuth && <AlertMessage>{errorAuth}</AlertMessage>}
            <div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-row mt-6 flex-wrap justify-between align-middle"
              >
                <div className="flex flex-col w-full sm:w-fit">
                  <div className="mb-3 md:mb-6">
                    <label className=" inline-block w-[118px] text-xl align-top mb-2">
                      Email
                    </label>
                    <input
                      className="rounded-md pointer-events-none bg-[#bcbcbc7d] w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1  text-lg"
                      type="text"
                      disabled
                      {...register("email", {
                        required: "This field is required",
                      })}
                    />
                    {errors.email && (
                      <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                        <AlertMessage>{errors.email.message}</AlertMessage>
                      </div>
                    )}
                  </div>
                  <div className="mb-3 md:mb-6">
                    <label className="inline-block w-[118px] text-xl align-top mb-2">
                      Full Name
                    </label>
                    <input
                      className={`${
                        !isUpdate
                          ? "pointer-events-none bg-[#bcbcbc7d]"
                          : "bg-[#ffffffb1]"
                      } rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 text-lg`}
                      type="text"
                      {...register("fullname", {
                        required: "This field is required",
                      })}
                    />
                    {errors.fullname && (
                      <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                        <AlertMessage>{errors.fullname.message}</AlertMessage>
                      </div>
                    )}
                  </div>
                  <div className="mb-3 md:mb-6">
                    <label className="inline-block w-[118px] text-xl align-top mb-2">
                      Phone
                    </label>
                    <input
                      className={`${
                        !isUpdate
                          ? "pointer-events-none bg-[#bcbcbc7d]"
                          : "bg-[#ffffffb1]"
                      } rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 text-lg`}
                      type="text"
                      {...register("phone", {
                        required: "This field is required",
                      })}
                    />
                    {errors.phone && (
                      <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                        <AlertMessage>{errors.phone.message}</AlertMessage>
                      </div>
                    )}
                  </div>
                  <div className="mb-3 md:mb-6">
                    <label className="inline-block w-[118px] text-xl align-top mb-2">
                      Address
                    </label>
                    <input
                      className={`${
                        !isUpdate
                          ? "pointer-events-none bg-[#bcbcbc7d]"
                          : "bg-[#ffffffb1]"
                      } rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1  text-lg`}
                      type="text"
                      {...register("address", {
                        required: "This field is required",
                      })}
                    />
                    {errors.address && (
                      <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                        <AlertMessage>{errors.address.message}</AlertMessage>
                      </div>
                    )}
                  </div>
                  <div className="">
                    <label className=" inline-block w-[118px] text-xl align-top mb-2">
                      Role
                    </label>
                    <input
                      className="rounded-md pointer-events-none bg-[#bcbcbc7d] w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1  text-lg"
                      type="text"
                      disabled
                      {...register("role", {
                        required: "This field is required",
                      })}
                    />
                  </div>
                </div>
                <div>
                  <img
                    className="rounded-md hidden md:block w-[29vw] mt-0 xl:w-[40vw] max-h-[232px] object-contain ml-1"
                    src={avtPlaceholder}
                    alt=""
                  />
                </div>
                <div className="rounded-md w-full text-center my-4">
                  {!isUpdate && (
                    <>
                      <button
                        className="rounded-md mt-2 px-20 py-1.5 bg-[#F15B43] hover:bg-[#ffffff96] text-white hover:text-black border-2 border-black font-[Jost] font-bold"
                        type="button"
                        onClick={() => setIsUpdate(true)}
                      >
                        UPDATE
                      </button>
                      <button
                        className="rounded-md mt-2 px-10 sm:px-20 sm:ml-2 py-1.5 bg-[#F15B43] hover:bg-[#ffffff96] text-white hover:text-black border-2 border-black font-[Jost] font-bold"
                        type="button"
                        onClick={() => navigate("/reset-password/request")}
                      >
                        CHANGE PASSWORD
                      </button>
                    </>
                  )}

                  {isUpdate && (
                    <>
                      <button
                        className="rounded-md mt-2 px-20 py-1.5 bg-[#F15B43] hover:bg-[#ffffff96] text-white hover:text-black border-2 border-black font-[Jost] font-bold"
                        type="submit"
                      >
                        SUBMIT
                      </button>
                      <button
                        className="rounded-md mt-2 px-10 sm:px-20 sm:ml-2 py-1.5 bg-transparent text-black border-2 border-black hover:bg-red-500 font-[Jost] font-bold"
                        type="button"
                        onClick={() => setIsUpdate(false)}
                      >
                        CANCEL
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
