import React from "react";
import { useNavigate } from "react-router-dom";

export const Causes = (props) => {
  const navigate = useNavigate();
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
        "Help us provide food and shelter to homeless animals by donating to our cause.",
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
        "Your donation will help us provide clean drinking water to communities in need.",
      image: "https://i.ytimg.com/vi/17Se0b7T5EI/maxresdefault.jpg",
    },
    {
      _id: 5,
      title: "Support Local Farmers",
      goal: 3000,
      raised: 1800,
      finishAt: "2023-11-30",
      description:
        "Help us provide assistance to local farmers by donating to our cause.",
      image:
        "https://www.scdailypress.com/silvercitydailypress/news/wp-content/uploads/sites/2/2018/04/frisco-skagg-tomatoes.jpg",
    },
  ];

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className="container mb-24 px-4 mx-auto">
      <section className="mb-32 text-gray-800 text-center">
        <h2
          className="text-3xl font-bold mb-12 pb-4 text-center"
          ref={props.parentRef}
        >
          On-going causes
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-x-12">
          {causes.map((cause) => {
            return (
              <div className="mb-6 lg:mb-0" key={cause._id}>
                <div className="relative block bg-[#F4F2F1] rounded-lg ">
                  <div className="flex">
                    <div className="relative overflow-hidden bg-no-repeat bg-cover rounded-lg mx-4 -mt-4">
                      <img src={cause.image} alt="cause" className="w-full" />
                      <button href="#!">
                        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"></div>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col items-start justify-start">
                    <h5 className="font-[Jost] font-bold text-2xl mb-3 text-start">
                      {cause.title}
                    </h5>
                    <p className="font-[Rubik] mb-4 pb-2 text-start">
                      {truncateString(cause.description, 150)}
                    </p>
                    <div className="w-full bg-[#e7a095] text-white font-bold mb-4">
                      <div
                        className="bg-[#F15B43] p-0.5 text-center text-xs font-medium leading-none text-primary-100"
                        style={{
                          width: `${Math.floor(
                            (cause.raised * 100) / cause.goal
                          )}%`,
                        }}
                      >
                        {Math.floor((cause.raised * 100) / cause.goal)}%
                      </div>
                    </div>
                    <div className="flex flex-row justify-between  w-full">
                      <div className="text-start w-fit">
                        <h1 className="font-[Jost] text-[#65C9BB] font-bold">
                          ${cause.goal}
                        </h1>
                        <span className="font-[Rubik]">Goal</span>
                      </div>
                      <div className="text-start w-fit">
                        <h1 className="font-[Jost] text-[#65C9BB] font-bold">
                          ${cause.raised}
                        </h1>
                        <span className="font-[Rubik]">Raised</span>
                      </div>
                      <button
                        onClick={() => navigate("/donate/a")}
                        className="font-[Rubik] bg-[#F15B43] w-fit text-white hover:text-[#F15B43] text-lg font-bold py-2 px-5 flex items-center hover:bg-transparent border-2 border-transparent hover:border-[#F15B43] transition duration-150 ease-in-out"
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

// export default causes;
