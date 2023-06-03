import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Global from "../global";
import { useSelector } from "react-redux";

export const Causes = (props) => {
  const navigate = useNavigate();
  const [causes, setCauses] = useState();
  const session = useSelector((state) => state.session);
  useEffect(() => {
    axios
      .get(`${Global.BASE_BACKEND_API}/cause`, {
        params: {
          pageNumber: 1,
          nPerPage: 12,
        },
      })
      .then((res) => {
        setCauses(res.data.causes);
      });
  }, []);

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
        {!causes && (
          <div
            className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-x-12">
          {causes &&
            causes.map((cause) => {
              return (
                <div className="mb-6 lg:mb-0 " key={cause._id}>
                  <div className="relative bg-[#F4F2F1] rounded-lg ">
                    <div className="flex">
                      <div className="relative overflow-hidden bg-no-repeat bg-cover rounded-lg mx-4 -mt-4">
                        <img src={cause.image} alt="cause" className="w-full" />
                        <button
                          onClick={() => navigate(`/donate/${cause._id}`)}
                        >
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
                          onClick={
                            session._id !== ""
                              ? () => navigate(`/donate/${cause._id}`)
                              : () => navigate("/login")
                          }
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
