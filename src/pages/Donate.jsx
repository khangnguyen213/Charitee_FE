import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import { BsFillSunFill } from "react-icons/bs";
import AlertMessage from "../components/AlertMessage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Global from "../global";
import alertify from "alertifyjs";
import LoadingScreen from "../components/LoadingScreen";

const Donate = () => {
  const { causeID } = useParams();
  const [cause, setCause] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const finishAt = new Date(cause?.finishAt);
  const overdue = new Date() > finishAt;
  const finished = cause?.status === "finish";
  const maxDonate = cause?.goal - cause?.raised;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const createPayment = (data) => {
    if (data.method === "PayPal") {
      setIsLoading(true);
      const baseUrl = window.location.origin; // Get the base URL of your website
      const returnUrl = `${baseUrl}/success`;
      const cancelUrl = `${baseUrl}/cancel`;
      axios
        .post(
          `${Global.BASE_BACKEND_API}/payment/create-payment`,
          {
            price: data.amount,
            description: `Donate for ${cause.title}`,
            returnUrl,
            cancelUrl,
            causeID,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setIsLoading(false);
          const { approvalUrl } = response.data;
          window.location.href = approvalUrl;
        })
        .catch((err) => {
          setIsLoading(false);
          alertify.alert("Notification", err.response.data.error);
          console.log(err);
        });
    } else {
      setIsLoading(false);
      alertify.alert(
        "Notification",
        "This payment method is currently unavailable"
      );
    }
  };
  console.log(errors);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${Global.BASE_BACKEND_API}/cause`, {
        params: { causeID },
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCause(res.data.causes[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        navigate("/404");
      });
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!cause && (
        <div className="w-full h-fit text-center">
          <div
            className="inline-block h-12 w-12 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}
      {cause && (
        <>
          <div className="max-h-[520px] overflow-clip mt-40 sm:mt-0">
            <img
              src={cause.image}
              className="object-cover w-full min-h-[90vh] sm:min-h-screen"
              alt="banner"
            />
            <div className="hidden sm:block text-white absolute left-[10%] top-[30%] w-[80vw] sm:w-[56vw] sm:min-w-[350px] md:w-[35vw]">
              <h1 className="font-['Jost'] font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 md:mb-7 lg:mb-10">
                {cause.title}
              </h1>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full md:px-8 flex-wrap mt-5 mb-14">
            <div className="w-4/5 md:w-[60%] mx-auto md:mx-0 ">
              <h1 className="font-['Jost'] font-bold text-4xl my-5">
                {cause.title}
              </h1>
              <span className="font-[Rubik] text-slate-400">
                Finish at {finishAt.toLocaleDateString()}
              </span>
              <div>
                <div className="rounded-s-md font-['Jost'] font-bold text-white px-4 py-2  bg-[#263B5C] w-fit inline-block my-5">
                  Goal Cause ${cause.goal}
                </div>
                <div className="rounded-e-md font-['Jost'] font-bold text-white px-4 py-2 bg-[#F15B43] w-fit inline-block my-5">
                  Achieved ${cause.raised}
                </div>
              </div>
              <p className="text-justify font-[Rubik] whitespace-pre-line">
                {cause.description}
              </p>
            </div>
            <div className="w-4/5 md:w-[35%] h-fit bg-[#F15B43] text-white mx-auto md:mx-0 my-5 rounded-xl flex flex-col py-12 items-center">
              <h1 className="font-[Jost] font-bold text-4xl md:text-2xl lg:text-3xl xl:text-4xl mb-8">
                Choose Your Gift
              </h1>
              <form
                className="flex flex-col w-[80%]"
                onSubmit={handleSubmit(createPayment)}
              >
                <h1 className="font-[Jost] font-bold text-2xl">
                  Your Donation
                </h1>
                {errors.amount && (
                  <AlertMessage>{errors.amount.message}</AlertMessage>
                )}
                {errors.amount?.type === "max" && setValue("amount", maxDonate)}
                <div
                  className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full mt-2 mb-3"
                  role="toolbar"
                >
                  <button
                    type="button"
                    className="rounded-md inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#eb897a]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => {
                      setValue("amount", 5);
                    }}
                  >
                    $5
                  </button>
                  <button
                    type="button"
                    className="rounded-md inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white checked:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#263B5C] checked:bg-[#263B5C]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => {
                      setValue("amount", 10);
                    }}
                  >
                    $10
                  </button>
                  <button
                    type="button"
                    className="rounded-md inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#263B5C]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => {
                      setValue("amount", 20);
                    }}
                  >
                    $20
                  </button>
                  <button
                    type="button"
                    className="rounded-md inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#263B5C]"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={() => {
                      setValue("amount", 50);
                    }}
                  >
                    $50
                  </button>
                </div>

                <div className="rounded-md py-2.5 px-4 text-lg mb-4 text-black bg-white">
                  <span className="w-[5%] float-left">$</span>
                  <input
                    className="rounded-md w-[95%] float-right"
                    type="number"
                    placeholder="Donation Amount"
                    {...register("amount", {
                      required: "This field is required",
                      min: {
                        value: 1,
                        message: "Donation amount must be postive",
                      },
                      max: {
                        value: maxDonate,
                        message: `Donation cannot excess $${maxDonate}`,
                      },
                    })}
                  />
                </div>

                <p className="rounded-md text-xs flex flex-row justify-center items-center px-2 py-2 bg-[#ffffff6e]">
                  <BsFillSunFill /> Multiply your impact. Share it with your
                  friends
                </p>
                <h1 className="font-[Jost] font-bold text-2xl my-3">
                  Payment Method
                  {errors.method && (
                    <AlertMessage>{errors.method.message}</AlertMessage>
                  )}
                </h1>
                <input
                  {...register("method", {
                    required: "This field is required",
                  })}
                  type="radio"
                  value="PayPal"
                  id="radio01"
                  className="rounded-md peer/radio01 hidden"
                />
                <label
                  htmlFor="radio01"
                  className="rounded-md cursor-pointer mb-3 bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold leading-normal text-gray-600 peer-checked/radio01:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#eb897a] focus:outline-none focus:ring-0 peer-checked/radio01:bg-[#263B5C]"
                >
                  PayPal
                </label>

                <input
                  {...register("method", {
                    required: "This field is required",
                  })}
                  type="radio"
                  value="Bank Transfer"
                  id="radio02"
                  className="rounded-md peer/radio02 hidden"
                />
                <label
                  htmlFor="radio02"
                  className="rounded-md cursor-pointer mb-3 bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold leading-normal text-gray-600 peer-checked/radio02:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#eb897a] focus:outline-none focus:ring-0 peer-checked/radio02:bg-[#263B5C]"
                >
                  Bank Transfer
                </label>
                {!overdue && !finished && (
                  <input
                    className="rounded-md hover:bg-[#ffffff] uppercase hover:text-[#ee5e48] font-[Jost] font-bold py-2 mt-5 text-lg bg-transparent border-2 hoverborder-transparent border-white duration-300 text-white hover:text-xl cursor-pointer"
                    type="submit"
                  >
                    SUBMIT
                  </input>
                )}
                {(overdue || finished) && (
                  <p
                    onClick={() => {
                      alertify.alert(
                        "Notification",
                        "Regretfully, this cause is no longer accepting donations. Thank you for your generosity and support."
                      );
                    }}
                    className="rounded-md hover:bg-[#ffffff] uppercase hover:text-[#ee5e48] font-[Jost] font-bold py-2 mt-5 text-lg bg-transparent border-2 hoverborder-transparent border-white duration-300 text-center text-white hover:text-xl cursor-pointer"
                  >
                    CLOSED
                  </p>
                )}
              </form>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Donate;
