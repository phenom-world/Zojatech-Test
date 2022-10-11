import React, { useEffect, useState } from "react";
import GuestRoute from "../HOC/GuestRoute";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { toast } from "react-toastify";
import { useOrganizationSigninMutation } from "../redux/services";
import { initialSigninValues, signinSchema } from "../schemas/organization";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modal/modalRedux";
import { setLoginUser } from "../redux/slices/auth";
import CoverImage from "../components/icons/CoverImage";
import LoadingModal from "../components/Loader/LoadingModal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginCompany, { data, isLoading, isSuccess, isError, error }] = useOrganizationSigninMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      dispatch(openModal());
    }
    if (isSuccess) {
      navigate("/organization");
      dispatch(setLoginUser(data));
      dispatch(closeModal());
    }
    if (isError && error) {
      toast.error(error?.data?.message);
      dispatch(closeModal());
    }
  }, [dispatch, isLoading, isError, error, isSuccess, navigate, data]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const submitHandler = (values) => {
    loginCompany(values);
  };

  return (
    <GuestRoute>
      <LoadingModal />
      <div className="flex w-full min-h-screen overflow-hidden md:h-screen">
        <CoverImage />
        <div className="flex items-center justify-between py-12 flex-col w-full md:w-[50%]">
          <div className="w-full h-full flex flex-col items-center justify-center overflow-scroll scrollbar-hide">
            <div className="mb-4 md:mb-12 font-bold text-[16px] md:text-[28px]">
              Welcome <span className="text-primary">Back!</span>
            </div>
            <Formik onSubmit={submitHandler} initialValues={initialSigninValues} validationSchema={signinSchema}>
              {({ handleSubmit, values }) => (
                <div className="w-full flex flex-col items-center justify-center ">
                  <div className="pt-8">
                    <div className="mt-1 relative flex md:justify-end">
                      <Field
                        name={"email"}
                        value={values.email || ""}
                        label="Email"
                        className="border w-[250px] md:w-[337px] h-[50px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                      />
                    </div>
                    <ErrorMessage
                      name={"email"}
                      render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                    />{" "}
                  </div>

                  <div className="pt-8">
                    <div className="mt-1 relative flex md:justify-end">
                      <Field
                        name={"password"}
                        value={values.password || ""}
                        onKeyDown={(e) => {
                          e.key === "Enter" && handleSubmit();
                        }}
                        label="Password"
                        type={`${showPassword ? "text" : "password"}`}
                        className="border w-[250px] md:w-[337px] h-[50px] border-primary  rounded px-2  focus:outline-none text-[14px] font-semibold "
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
                  <div className="mt-1 relative flex md:justify-end">
                    <div className="pt-5 text-[9px] flex justify-end font-semibold text-[red] w-[210px] md:w-[337px]">
                      <p>Forgot password? </p>
                    </div>
                  </div>
                  <p className="text-[12px] md:text-base font-semibold text-[#ACACAC] mt-[40px]">
                    Don't have an account?
                    <Link to="/register">
                      {" "}
                      <span className="text-primary cursor-pointer pl-2">Sign up</span>
                    </Link>
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="w-[250px] md:w-[337px] h-[50px] bg-primary rounded mt-6 text-white text-base font-semibold"
                  >
                    Login
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

export default Login;
