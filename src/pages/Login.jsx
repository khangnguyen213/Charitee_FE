import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg1 from "../assests/images/bg1.jpg";
import Footer from "../components/Footer";
import AlertMessage from "../components/AlertMessage";
import { useForm } from "react-hook-form";
import axios from "axios";
import Global from "../global";
import { useDispatch } from "react-redux";
import { login } from "../redux/sessionSlice";
import LoadingScreen from "../components/LoadingScreen";
import alertify from "alertifyjs";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuth, setErrAuth] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post(`${Global.BASE_BACKEND_API}/account/login`, data, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          dispatch(login(res.data));
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrAuth(err.response.data);
      });
  };
  return (
    <>
      {isLoading && <LoadingScreen />}

      <section className="h-screen">
        <div className="sm:container px-6 mt-40 mb-4 xl:mb-0 sm:mt-24 mx-auto">
          <div className="flex h-full flex-wrap items-start justify-center lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:w-8/12 lg:w-6/12 max-h-screen">
              <img
                src={bg1}
                className="max-h-[400px] sm:max-h-fit sm:object-scale-down sm:h-[80vh] xl:w-full xl:h-auto sm:m-auto"
                alt="Donate please"
              />
            </div>

            {/* <!-- Right column container with form --> */}
            <div className="sm:w-8/12 lg:ml-6 lg:w-5/12">
              <h1 className="font-['Jost'] font-bold text-4xl mb-5 md:mb-7">
                Sign In
                {errorAuth && <AlertMessage>{errorAuth}</AlertMessage>}
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <!-- Email input --> */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    className="block min-h-[auto] w-full rounded border-2 border-[#f15a43b5] bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="emailInput"
                    placeholder="Email address"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <AlertMessage>{errors.email.message}</AlertMessage>
                  )}
                </div>

                {/* <!-- Password input --> */}
                <div className="relative mb-6">
                  <input
                    type="password"
                    className="block min-h-[auto] w-full rounded border-2 border-[#f15a43b5] bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
                    id="passwordInput"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <AlertMessage>{errors.password.message}</AlertMessage>
                  )}
                </div>

                <div className="mb-6 flex items-center justify-between">
                  {/* <!-- Forgot password link --> */}
                  <button
                    type="button"
                    onClick={() => navigate("/reset-password/request")}
                    className="text-[#263B5C] transition duration-300 ease-in-out hover:font-bold hover:text-[#183460] focus:text-[#163361]"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="inline-block w-full rounded bg-[#F15B43] px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white transition duration-150 ease-in-out border-2 border-transparent hover:border-[#F15B43] hover:text-[#F15B43] hover:font-bold hover:bg-transparent"
                >
                  Sign in
                </button>

                {/* <!-- Divider --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>

                {/* <!-- Social login buttons --> */}
                <div
                  className="cursor-pointer mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  style={{ backgroundColor: "#3b5998" }}
                  onClick={() => {
                    alertify.alert(
                      "Notification",
                      "This login method is currently available"
                    );
                  }}
                >
                  {/* <!-- Facebook --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                  Continue with Facebook
                </div>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-danger ml-2 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Login;
