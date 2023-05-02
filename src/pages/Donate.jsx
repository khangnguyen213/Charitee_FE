import React from "react";
import { useForm } from "react-hook-form";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BsFillSunFill } from "react-icons/bs";

const Donate = () => {
  const cause = {
    _id: 1,
    title: "Support Education for Children in Need",
    goal: 10000,
    raised: 7500,
    finishAt: "2023-12-31",
    description:
      "Education is a fundamental right that should be accessible to all children.Unfortunately, millions of children around the world do not have access to education due to poverty and lack of resources.\n \n We are raising funds to provide access to education for children in need by building schools, providing school supplies and textbooks, and offering scholarships. Your donation can help give children the gift of education and the chance for a brighter future.\n\nThis fundraising campaign aims to provide access to education for children in need around the world. With a goal of $75,000, the funds raised will be used to build schools, provide school supplies and textbooks, and offer scholarships to children who may not have access to education due to poverty and lack of resources. This campaign is an opportunity for donors to make a positive impact on the future of children in need.This fundraising campaign aims to provide emergency relief supplies to those affected by the earthquake in Haiti. With a goal of $100,000, the funds raised will be used to provide essential supplies such as food, water, shelter, and medical supplies to those in need. This campaign is an opportunity for donors to help provide life-saving assistance to those impacted by the disaster.",
    image:
      "https://donate.worldvision.org/wp-content/uploads/2017/08/D200-0933-23_cmyk-1.jpg",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <NavBar />
      <div className="max-h-[520px] overflow-clip">
        <img
          src={cause.image}
          className=" w-full min-h-[90vh] sm:min-h-screen"
          alt="banner"
        />
        <div className="text-white absolute left-[10%] top-[30%] w-[80vw] sm:w-[56vw] sm:min-w-[350px] md:w-[35vw]">
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
            Finish at {cause.finishAt}
          </span>
          <div>
            <div className="font-['Jost'] font-bold text-white px-4 py-2  bg-[#263B5C] w-fit inline-block my-5">
              Goal Cause ${cause.goal}
            </div>
            <div className="font-['Jost'] font-bold text-white px-4 py-2 bg-[#F15B43] w-fit inline-block my-5">
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-[Jost] font-bold text-2xl">Your Donation</h1>
            {errors.amount && (
              <AlertMessage>{errors.amount.message}</AlertMessage>
            )}
            <div
              className="grid grid-cols-4 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full mt-2 mb-3"
              role="toolbar"
            >
              <button
                type="button"
                className="inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#eb897a]"
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
                className="inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white checked:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#263B5C] checked:bg-[#263B5C]"
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
                className="inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#263B5C]"
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
                className="inline-block bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold uppercase leading-normal text-gray-600 active:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#263B5C] focus:outline-none focus:ring-0 active:bg-[#263B5C]"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => {
                  setValue("amount", 50);
                }}
              >
                $50
              </button>
            </div>
            <div className="py-2.5 px-4 text-lg mb-4 text-black bg-white">
              <span className="w-[5%] float-left">$</span>
              <input
                className="w-[95%] float-right"
                type="number"
                placeholder="Donation Amount"
                min={1}
                required
                {...register("amount", {
                  required: "This field is required",
                  min: { value: 1, message: "Donation amount must be postive" },
                })}
              />
            </div>

            <p className="text-xs flex flex-row justify-center items-center px-2 py-2 bg-[#ffffff6e]">
              <BsFillSunFill /> Multiply your impact. Share it with your friends
            </p>
            <h1 className="font-[Jost] font-bold text-2xl my-3">
              Payment Method
              {errors.amount && (
                <AlertMessage>{errors.amount.message}</AlertMessage>
              )}
            </h1>
            <input
              {...register("method", { required: "This field is required" })}
              type="radio"
              value="PayPal"
              id="radio01"
              className="peer/radio01 hidden"
            />
            <label
              htmlFor="radio01"
              className="cursor-pointer mb-3 bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold leading-normal text-gray-600 peer-checked/radio01:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#eb897a] focus:outline-none focus:ring-0 peer-checked/radio01:bg-[#263B5C]"
            >
              PayPal
            </label>

            <input
              {...register("method", { required: true })}
              type="radio"
              value="Bank Transfer"
              id="radio02"
              className="peer/radio02 hidden"
            />
            <label
              htmlFor="radio02"
              className="cursor-pointer mb-3 bg-white px-6 pb-2 pt-2.5 text-center font-[Rubik] font-bold leading-normal text-gray-600 peer-checked/radio02:text-white focus:text-white hover:text-white transition duration-150 ease-in-out hover:bg-[#eb897a] focus:bg-[#eb897a] focus:outline-none focus:ring-0 peer-checked/radio02:bg-[#263B5C]"
            >
              Bank Transfer
            </label>

            <input
              className="hover:bg-[#ffffff] uppercase hover:text-[#ee5e48] font-[Jost] font-bold py-2 mt-5 text-lg bg-transparent border-2 hoverborder-transparent border-white duration-300 text-white hover:text-xl cursor-pointer"
              type="submit"
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donate;
