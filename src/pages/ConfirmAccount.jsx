import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Global from "../global";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ConfirmAccount = () => {
  const { accountID } = useParams();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${Global.BASE_BACKEND_API}/account/confirm/${accountID}`, null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
        } else {
          navigate("/404");
        }
      })
      .catch((err) => navigate("/404"));
  }, []);

  return (
    <div className="">
      {success && (
        <section className=" text-gray-800 text-center lg:text-left background-radial-gradient">
          <div
            className="relative overflow-hidden bg-no-repeat bg-cover h-screen"
            style={{
              backgroundPosition: "50%",
              backgroundImage:
                "url('https://mdbootstrap.com/img/new/standard/nature/071.jpg')",
            }}
          >
            <div
              className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
            >
              <div className="flex justify-center items-center h-full">
                <div className="text-center text-white px-6 py-6 md:py-0 md:px-12 max-w-[800px]">
                  <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                    Success
                  </h2>
                  <BsFillCheckCircleFill className="mx-auto h-14 w-14 md:h-20 md:w-20 mb-6" />
                  <p className="text-lg mb-6">
                    Give a helping hand to those who need it now!
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="font-[Jost] font-bold text-xl md:text-2xl bg-[#F15B43] hover:bg-transparent px-8 py-2 border-2 border-transparent hover:border-white"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ConfirmAccount;
