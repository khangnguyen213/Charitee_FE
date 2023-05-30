import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imgPlaceholder from "../assests/images/img_placeholder.webp";
import AlertMessage from "../components/AlertMessage";
import axios from "axios";
import Global from "../global";
import alertify from "alertifyjs";
import { useSelector } from "react-redux";

const CauseCreate = () => {
  const { causeID } = useParams();
  const [errorAuth, setErrAuth] = useState();
  const sessionRole = useSelector((state) => state.session.role);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const imageWatch = watch("image");
  const raisedWatch = watch("raised");
  const submitCreate = (data) => {
    axios
      .post(`${Global.BASE_BACKEND_API}/cause`, data, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          alertify.notify("Successful", "success", 1, function () {
            navigate(`/admin/causes/${res.data}`);
          });
        }
      })
      .catch((err) => {
        alertify.alert(err.response.statusText);
        if (err.response.status === 403) {
          navigate("/404");
        }
        setErrAuth(err.response.statusText);
      });
  };
  const submitUpdate = (data) => {
    axios
      .put(
        `${Global.BASE_BACKEND_API}/cause`,
        {
          ...data,
          causeID,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status === 200) {
          alertify.alert("Information", "Cause Updated", function () {
            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
          });
        }
      })
      .catch((err) => {
        alertify.alert(err.response.statusText);
        if (err.response.status === 403) {
          navigate("/404");
        }
        setErrAuth(err.response.statusText);
      });
  };
  const onSubmit = (data) => {
    alertify.confirm(
      "Notification",
      `Confirm to create/update cause?`,
      function () {
        if (causeID === "create") {
          submitCreate(data);
        } else {
          submitUpdate(data);
        }
      },
      function () {
        alertify.error("Cancel");
      }
    );
  };
  useEffect(() => {
    if (causeID !== "create") {
      axios
        .get(`${Global.BASE_BACKEND_API}/cause`, {
          params: { causeID },
          withCredentials: true,
        })
        .then((res) => {
          const causeData = res.data.causes[0];
          setValue("title", causeData.title);
          setValue("description", causeData.description);
          setValue(
            "finishAt",
            new Date(causeData.finishAt).toISOString().slice(0, 10)
          );
          setValue("image", causeData.image);
          setValue("goal", causeData.goal);
          setValue("raised", causeData.raised);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate("/404");
          }
        });
    }
    // setTimeout(() => {
    //   if (!["admin", "master"].includes(sessionRole)) {
    //     navigate("/404");
    //   }
    // }, 1000);
  }, []);
  return (
    <div className="font-[Rubik] h-fit min-h-screen px-[5vh] xl:px-[10vh] pt-44 sm:pt-20">
      {["admin", "master"].includes(sessionRole) && (
        <div>
          <h1 className="font-[Jost] font-bold text-3xl sm:text-4xl py-6">
            {causeID !== "create"
              ? "Edit Project Detail"
              : "Create New Project"}
          </h1>
          {errorAuth && <AlertMessage>{errorAuth}</AlertMessage>}
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-row mt-6 flex-wrap justify-between align-middle"
            >
              <div className="flex flex-col w-full sm:w-fit">
                <div className="mb-2 w-full">
                  <label className="inline-block w-[118px] text-xl align-top mb-2">
                    Title
                  </label>

                  <textarea
                    rows={3}
                    type="text"
                    className={`${
                      causeID !== "create"
                        ? "pointer-events-none bg-[#bcbcbc7d]"
                        : "bg-[#ffffffb1]"
                    } rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 text-lg`}
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                      <AlertMessage>{errors.title.message}</AlertMessage>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="inline-block w-[118px] text-xl align-top mb-2">
                    Finish At
                  </label>
                  <input
                    type="date"
                    className="rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 bg-[#ffffffb1] text-lg"
                    {...register("finishAt", {
                      required: "This field is required",
                      validate: (value, formValues) => {
                        const date = new Date(value);
                        if (date > Date.now()) {
                          return true;
                        } else {
                          if (causeID === "create") {
                            return "The period must be last longer";
                          } else {
                            return "The period must be in the future";
                          }
                        }
                      },
                    })}
                  />
                  {errors.finishAt && (
                    <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                      <AlertMessage>{errors.finishAt.message}</AlertMessage>
                    </div>
                  )}
                </div>
                {causeID !== "create" && (
                  <div className="mb-2">
                    <label className="inline-block w-[118px] text-xl align-top mb-2">
                      Raised
                    </label>
                    <input
                      className="rounded-md pointer-events-none w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 bg-[#bcbcbc7d] text-lg"
                      type="number"
                      {...register("raised")}
                    />
                  </div>
                )}

                <div className="mb-2">
                  <label className="inline-block w-[118px] text-xl align-top mb-2">
                    Goal
                  </label>
                  <input
                    className="rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 bg-[#ffffffb1] text-lg"
                    type="number"
                    {...register("goal", {
                      required: "You must specific the target amount",
                      min: {
                        value: causeID !== "create" ? raisedWatch : 1,
                        message:
                          causeID !== "create"
                            ? "Goal amount must higher than raised amooun"
                            : "This amount must be positive",
                      },
                    })}
                  />
                  {errors.goal && (
                    <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                      <AlertMessage>{errors.goal.message}</AlertMessage>
                    </div>
                  )}
                </div>

                <div className="mb-2">
                  <label className="inline-block w-[118px] text-xl align-top mb-2">
                    Image
                  </label>
                  <input
                    className="rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 bg-[#ffffffb1] text-lg"
                    type="url"
                    {...register("image", {
                      required: "You must provided an image",
                    })}
                  />
                  {errors.image && (
                    <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                      <AlertMessage>{errors.image.message}</AlertMessage>
                    </div>
                  )}
                </div>
                <div className="">
                  <label className="inline-block w-[118px] text-xl align-top mb-2">
                    Description
                  </label>
                  <textarea
                    className="rounded-md w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw] border-2 border-black p-1 bg-[#ffffffb1] text-lg"
                    rows={8}
                    type="text"
                    {...register("description", {
                      required: "This field is required",
                    })}
                  />
                  {errors.description && (
                    <div className="w-full sm:w-[70vw] md:w-[45vw] xl:w-[35vw]">
                      <AlertMessage>{errors.description.message}</AlertMessage>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <img
                  className="rounded-md md:w-[29vw] mt-2 md:mt-0 xl:w-[40vw] min-h-[40vh] max-h-[400px] object-cover md:ml-1"
                  src={imageWatch ? imageWatch : imgPlaceholder}
                  alt=""
                />
              </div>
              <div className="rounded-md w-full text-center my-4">
                <button
                  className="rounded-md px-20 py-1.5 bg-[#F15B43] hover:bg-[#ffffff96] text-white hover:text-black border-2 border-black font-[Jost] font-bold"
                  type="submit"
                >
                  CONFIRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CauseCreate;
