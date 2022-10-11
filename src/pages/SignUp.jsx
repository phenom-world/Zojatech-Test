import React, { useEffect, useState } from "react";
import GuestRoute from "../HOC/GuestRoute";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { useOrganizationSignupMutation } from "../redux/services";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modal/modalRedux";
import LoadingModal from "../components/Loader/LoadingModal";
import CoverImage from "../components/icons/CoverImage";
import { initialSignUpValue, signUpSchema } from "../schemas/organization";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerCompany, { data, isLoading, isSuccess, isError, err }] = useOrganizationSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(openModal());
    }
    if (isSuccess) {
      navigate("/");
      toast.success(data.message);
      dispatch(closeModal());
    }
    if (isError && err && "status" in err) {
      toast.error(err?.data?.message);
      dispatch(closeModal());
    }
  }, [dispatch, isLoading, isError, err, isSuccess, navigate, data]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const submitHandler = (values) => {
    registerCompany(values);
  };

  return (
    <GuestRoute>
      <LoadingModal />
      <div className="flex w-full min-h-screen overflow-hidden md:h-screen">
        <CoverImage />
        <div className="flex items-center overflow-auto py-12 justify-between flex-col w-full md:w-[50%] scrollbar-hide">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h2 className="font-bold  text-[20px] md:text-[36px] w-[210px] md:w-[337px] text-[#1A1D4D]">Hello! Sign up to Get Started</h2>
            <Formik onSubmit={submitHandler} initialValues={initialSignUpValue} validationSchema={signUpSchema} enableReinitialize>
              {({ handleSubmit, values, setFieldTouched }) => (
                <div className="w-full flex flex-col items-center justify-center ">
                  <div className="pt-6">
                    <div className="mt-1 relative flex md:justify-end">
                      <Field
                        name={"name"}
                        label="Name"
                        onKeyUp={() => setFieldTouched("name", true)}
                        value={values.name || ""}
                        placeholder="Enter organization's name"
                        className="border w-[250px] h-[50px] md:w-[337px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                      />
                    </div>
                    <ErrorMessage
                      name={"name"}
                      render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                    />{" "}
                  </div>
                  <div className="pt-6">
                    <div className="mt-1 relative flex md:justify-end">
                      <Field
                        name={"email"}
                        onKeyUp={() => setFieldTouched("email", true)}
                        value={values.email || ""}
                        label="Email"
                        placeholder="johndoe@email.com"
                        className="border w-[250px] h-[50px] md:w-[337px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                      />
                    </div>
                    <ErrorMessage
                      name={"email"}
                      render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                    />{" "}
                  </div>{" "}
                  <div className="pt-6">
                    <div className="mt-1 relative flex md:justify-end">
                      <Field
                        name={"password"}
                        onKeyDown={(e) => {
                          e.key === "Enter" && handleSubmit();
                        }}
                        label="Password"
                        value={values.password || ""}
                        onKeyUp={() => setFieldTouched("password", true)}
                        placeholder="*********"
                        type={`${showPassword ? "text" : "password"}`}
                        className="border w-[250px] h-[50px] md:w-[337px] border-primary  rounded px-2  focus:outline-none text-[14px] font-semibold "
                      />
                      <i
                        onClick={togglePassword}
                        className={`text-gray-500 top-[26px]  -translate-y-1/2 right-4 absolute fa-solid fa-eye${showPassword ? "" : "-slash"}`}
                      ></i>
                    </div>
                    <ErrorMessage
                      name={"password"}
                      render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                    />{" "}
                  </div>
                  <div className="pt-6">
                    <div className="mt-1 relative flex md:justify-end">
                      <Field
                        name={"password_confirmation"}
                        onKeyDown={(e) => {
                          e.key === "Enter" && handleSubmit();
                        }}
                        label="Confirm Password"
                        value={values.password_confirmation || ""}
                        onKeyUp={() => setFieldTouched("password_confirmation", true)}
                        placeholder="*********"
                        type={`${showPassword ? "text" : "password"}`}
                        className="border w-[250px] h-[50px] md:w-[337px] border-primary  rounded px-2  focus:outline-none text-[14px] font-semibold "
                      />
                      <i
                        onClick={togglePassword}
                        className={`text-gray-500 top-[26px]  -translate-y-1/2 right-4 absolute fa-solid fa-eye${showPassword ? "" : "-slash"}`}
                      ></i>
                    </div>
                    <ErrorMessage
                      name={"password_confirmation"}
                      render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                    />{" "}
                  </div>
                  <p className="text-[12px] md:text-base font-semibold text-[#ACACAC] mt-[40px]">
                    Already have an account?
                    <Link to="/">
                      {" "}
                      <span className="text-primary cursor-pointer pl-2">Login</span>
                    </Link>
                  </p>
                  <button
                    onClick={handleSubmit}
                    className=" w-[210px] md:w-[337px] h-[50px] bg-primary rounded mt-4 text-white text-base font-semibold"
                  >
                    Signup
                  </button>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </GuestRoute>
  );
};

export default SignUp;
