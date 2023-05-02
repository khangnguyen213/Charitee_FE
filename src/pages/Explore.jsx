import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [search, setSearch] = useState("");
  const causes = [
    {
      _id: 1,
      title: "Support Education for Children in Need",
      goal: 10000,
      raised: 7500,
      finishAt: "2023-12-31",
      description:
        "Education is a fundamental right that should be accessible to all children. Unfortunately, millions of children around the world do not have access to education due to poverty and lack of resources. We are raising funds to provide access to education for children in need by building schools, providing school supplies and textbooks, and offering scholarships. Your donation can help give children the gift of education and the chance for a brighter future.This fundraising campaign aims to provide access to education for children in need around the world. With a goal of $75,000, the funds raised will be used to build schools, provide school supplies and textbooks, and offer scholarships to children who may not have access to education due to poverty and lack of resources. This campaign is an opportunity for donors to make a positive impact on the future of children in need.This fundraising campaign aims to provide emergency relief supplies to those affected by the earthquake in Haiti. With a goal of $100,000, the funds raised will be used to provide essential supplies such as food, water, shelter, and medical supplies to those in need. This campaign is an opportunity for donors to help provide life-saving assistance to those impacted by the disaster.",
      image:
        "https://donate.worldvision.org/wp-content/uploads/2017/08/D200-0933-23_cmyk-1.jpg",
    },
    {
      _id: 2,
      title: "Emergency Relief Fund for Natural Disasters",
      goal: 5000,
      raised: 1200,
      finishAt: "2023-10-31",
      description:
        "Deforestation is a major contributor to climate change, leading to the loss of habitats, biodiversity, and soil erosion. We are raising funds to plant trees and restore forests in areas affected by deforestation. Your donation can help combat climate change and preserve the planet for future generations. This fundraising campaign aims to provide access to education for children in need around the world. With a goal of $75,000, the funds raised will be used to build schools, provide school supplies and textbooks, and offer scholarships to children who may not have access to education due to poverty and lack of resources. This campaign is an opportunity for donors to make a positive impact on the future of children in need.This fundraising campaign aims to provide emergency relief supplies to those affected by the earthquake in Haiti. With a goal of $100,000, the funds raised will be used to provide essential supplies such as food, water, shelter, and medical supplies to those in need. This campaign is an opportunity for donors to help provide life-saving assistance to those impacted by the disaster. This fundraising campaign aims to combat climate change by planting trees and restoring forests in areas affected by deforestation. With a goal of $20,000, the funds raised will be used to plant trees and help restore habitats, biodiversity, and prevent soil erosion. This campaign is an opportunity for donors to contribute to preserving the planet for future generations.",
      image:
        "https://www.sadlier.com/hubfs/images/We_Believe_Blog_Images/responding-to-natural-disasters-in-the-catholic-classroom-teaching-catholic-kids.png",
    },
    {
      _id: 3,
      title: "Animal Shelter Fund",
      goal: 2000,
      raised: 800,
      finishAt: "2023-09-30",
      description:
        "Deforestation is a major contributor to climate change, leading to the loss of habitats, biodiversity, and soil erosion. We are raising funds to plant trees and restore forests in areas affected by deforestation. Your donation can help combat climate change and preserve the planet for future generations. This fundraising campaign aims to provide access to education for children in need around the world. With a goal of $75,000, the funds raised will be used to build schools, provide school supplies and textbooks, and offer scholarships to children who may not have access to education due to poverty and lack of resources. This campaign is an opportunity for donors to make a positive impact on the future of children in need.This fundraising campaign aims to provide emergency relief supplies to those affected by the earthquake in Haiti. With a goal of $100,000, the funds raised will be used to provide essential supplies such as food, water, shelter, and medical supplies to those in need. This campaign is an opportunity for donors to help provide life-saving assistance to those impacted by the disaster. This fundraising campaign aims to combat climate change by planting trees and restoring forests in areas affected by deforestation. With a goal of $20,000, the funds raised will be used to plant trees and help restore habitats, biodiversity, and prevent soil erosion. This campaign is an opportunity for donors to contribute to preserving the planet for future generations.",
      image:
        "https://www.americanhumane.org/app/uploads/2020/04/FY20-cv19-email-quotes-header-A.jpg",
    },
    {
      _id: 4,
      title: "Clean Water Initiative",
      goal: 15000,
      raised: 5000,
      finishAt: "2024-06-30",
      description:
        "Deforestation is a major contributor to climate change, leading to the loss of habitats, biodiversity, and soil erosion. We are raising funds to plant trees and restore forests in areas affected by deforestation. Your donation can help combat climate change and preserve the planet for future generations. This fundraising campaign aims to provide access to education for children in need around the world. With a goal of $75,000, the funds raised will be used to build schools, provide school supplies and textbooks, and offer scholarships to children who may not have access to education due to poverty and lack of resources. This campaign is an opportunity for donors to make a positive impact on the future of children in need.This fundraising campaign aims to provide emergency relief supplies to those affected by the earthquake in Haiti. With a goal of $100,000, the funds raised will be used to provide essential supplies such as food, water, shelter, and medical supplies to those in need. This campaign is an opportunity for donors to help provide life-saving assistance to those impacted by the disaster. This fundraising campaign aims to combat climate change by planting trees and restoring forests in areas affected by deforestation. With a goal of $20,000, the funds raised will be used to plant trees and help restore habitats, biodiversity, and prevent soil erosion. This campaign is an opportunity for donors to contribute to preserving the planet for future generations.",
      image: "https://i.ytimg.com/vi/17Se0b7T5EI/maxresdefault.jpg",
    },
    {
      _id: 5,
      title: "Support Local Farmers",
      goal: 3000,
      raised: 1800,
      finishAt: "2023-11-30",
      description:
        "Deforestation is a major contributor to climate change, leading to the loss of habitats, biodiversity, and soil erosion. We are raising funds to plant trees and restore forests in areas affected by deforestation. Your donation can help combat climate change and preserve the planet for future generations. This fundraising campaign aims to provide access to education for children in need around the world. With a goal of $75,000, the funds raised will be used to build schools, provide school supplies and textbooks, and offer scholarships to children who may not have access to education due to poverty and lack of resources. This campaign is an opportunity for donors to make a positive impact on the future of children in need.This fundraising campaign aims to provide emergency relief supplies to those affected by the earthquake in Haiti. With a goal of $100,000, the funds raised will be used to provide essential supplies such as food, water, shelter, and medical supplies to those in need. This campaign is an opportunity for donors to help provide life-saving assistance to those impacted by the disaster. This fundraising campaign aims to combat climate change by planting trees and restoring forests in areas affected by deforestation. With a goal of $20,000, the funds raised will be used to plant trees and help restore habitats, biodiversity, and prevent soil erosion. This campaign is an opportunity for donors to contribute to preserving the planet for future generations.",
      image:
        "https://www.scdailypress.com/silvercitydailypress/news/wp-content/uploads/sites/2/2018/04/frisco-skagg-tomatoes.jpg",
    },
  ];
  const navigate = useNavigate();
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const searchClickHandler = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
  };

  return (
    <div className="container my-24 px-6 mx-auto">
      <NavBar />
      <section className="mb-32 text-gray-800 text-center md:text-left">
        <h2 className="font-[Jost] text-4xl font-bold mb-6 text-center">
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
        {causes
          .filter(
            (cause) =>
              cause.title.includes(search) ||
              cause.title.toLowerCase().includes(search)
          )
          .map((cause) => {
            return (
              <div
                key={cause._id}
                className="flex flex-wrap mb-6 bg-[#F4F2F1] px-2 py-2 md:py-4 sm:py-6 rounded-3xl"
              >
                <div className="self-center grow-0 shrink-0 basis-auto w-full md:w-5/12 xl:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
                  <div
                    className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={cause.image}
                      className="w-full"
                      alt={cause.title}
                    />
                    <a href="#!">
                      <div
                        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                      ></div>
                    </a>
                  </div>
                </div>

                <div className="grow-0 shrink-0 basis-auto w-full md:w-7/12 xl:w-9/12 px-3 mb-6 md:mb-0 mr-auto">
                  <h5 className="text-xl font-bold mb-3">{cause.title}</h5>
                  <div className="mb-3 text-yellow-500 font-medium text-sm flex items-center justify-center md:justify-start">
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
                      End at <u>{cause.finishAt}</u>
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
                    onClick={() => navigate("/donate/a")}
                    className=" font-[Rubik] bg-[#F15B43] text-white hover:text-[#F15B43] flex items-center hover:bg-transparent border-2 border-transparent hover:border-[#F15B43] transition duration-150 ease-in-out  py-2 md:py-4 float-right justify-center w-full mt-3 rounded-xl sm:w-fit sm:px-8   "
                  >
                    <span className="pl-2">Donate</span>
                  </button>
                </div>
              </div>
            );
          })}
      </section>
      <Footer />
    </div>
  );
};

export default Explore;
