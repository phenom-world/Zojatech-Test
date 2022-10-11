import React, { useEffect, useState } from "react";
import AuthRoute from "../HOC/AuthRoute";
import Popup from "reactjs-popup";

import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Formik } from "formik";
import { initialUserDetails, UpdateDetailsSchema } from "../schemas/organization";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Loader/Spinner";
import { useGetOrganizationQuery, useLogoutMutation, useUpdateOrganizationMutation } from "../redux/services";
import { setLoginUser } from "../redux/slices/auth";

const OrganizationList = () => {
  const { user } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetOrganizationQuery(user.id);
  const [isloading, setIsLoading] = useState(false);
  const [logOutUser, { isLoading, isSuccess, isError, error }] = useLogoutMutation();
  const [updateDetails, { data: response, isLoading: Loading, isSuccess: success, isError: iserror, error: err }] = useUpdateOrganizationMutation();

  const handleLogout = async () => {
    await logOutUser();
  };

  const handleSubmit = async (values, close) => {
    await updateDetails(values);
    close();
  };

  useEffect(() => {
    if (Loading) {
      setIsLoading(true);
    }
    if (isSuccess) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
      setIsLoading(false);
    } else if (success) {
      dispatch(setLoginUser(response));
      toast.success("Details updated successfully");
      setIsLoading(false);
    }
    if ((isError && error && "status" in error) || (iserror && err && "status" in err)) {
      toast.error(error?.data?.message);
      setIsLoading(false);
    }
  }, [dispatch, isLoading, isError, isSuccess, navigate, data, error, success, iserror, err, Loading, response]);

  if (isFetching)
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <AuthRoute>
      <div className="w-full h-screen">
        <div className="flex justify-end px-4 md:px-24 items-center gap-4">
          <button
            onClick={handleLogout}
            className=" w-[160px] h-[50px] text-primary border border-primary hover:bg-primary rounded mt-4 hover:text-white text-base font-semibold"
          >
            Sign Out
          </button>
        </div>

        <div className="flex flex-col items-center justify-center  h-[calc(100%-500px)] w-full">
          <h2 className="font-semibold text-[20px] md:text-[32px] text-center">
            {" "}
            Welcome to your Dashboard <span className="text-primary font-bold">{user.name}</span>
          </h2>
          <p className="my-4 text-[14px] md:text-[18px]">Proceed to update your organization details</p>
          <Popup
            trigger={
              <button
                onClick={handleSubmit}
                className="focus:outline-none w-[160px] h-[50px] py-[10px]  bg-primary rounded mt-4 text-white text-base font-semibold"
              >
                Edit User{" "}
              </button>
            }
            modal
            contentStyle={{ padding: "70px", width: "fit-content", borderRadius: "10px" }}
          >
            {(close) => (
              <Formik
                onSubmit={(values) => handleSubmit(values, close)}
                initialValues={{ ...initialUserDetails, id: user.id }}
                validationSchema={UpdateDetailsSchema}
                enableReinitialize
              >
                {({ handleSubmit, values, setFieldTouched }) => (
                  <div className="w-full flex flex-col items-center justify-center ">
                    <h2 className="font-semibold text-[16px] md:text-[24px]"> Update Organization Details</h2>
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
                          name={"street"}
                          label="Street"
                          onKeyUp={() => setFieldTouched("name", true)}
                          value={values.street || ""}
                          placeholder="Enter Street details"
                          className="border w-[250px] h-[50px] md:w-[337px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                        />
                      </div>
                      <ErrorMessage
                        name={"street"}
                        render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                      />{" "}
                    </div>
                    <div className="pt-6">
                      <div className="mt-1 relative flex md:justify-end">
                        <Field
                          name={"city"}
                          label="City"
                          onKeyUp={() => setFieldTouched("city", true)}
                          value={values.city || ""}
                          placeholder="Enter City"
                          className="border w-[250px] h-[50px] md:w-[337px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                        />
                      </div>
                      <ErrorMessage
                        name={"city"}
                        render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                      />{" "}
                    </div>
                    <div className="pt-6">
                      <div className="mt-1 relative flex md:justify-end">
                        <Field
                          name={"state"}
                          label="State"
                          onKeyUp={() => setFieldTouched("state", true)}
                          value={values.state || ""}
                          placeholder="Enter State"
                          className="border w-[250px] h-[50px] md:w-[337px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                        />
                      </div>
                      <ErrorMessage
                        name={"state"}
                        render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                      />{" "}
                    </div>
                    <div className="pt-6">
                      <div className="mt-1 relative flex md:justify-end">
                        <Field
                          name={"country"}
                          label="Country"
                          onKeyUp={() => setFieldTouched("country", true)}
                          value={values.country || ""}
                          placeholder="Enter Country"
                          className="border w-[250px] h-[50px] md:w-[337px] border-primary font-Montserrat rounded px-2 focus:outline-none text-[14px] font-semibold"
                        />
                      </div>
                      <ErrorMessage
                        name={"country"}
                        render={(msg) => <div className={"text-[0.7812rem] text-red-600 text-left font-normal text-jumbleng-gray-main"}>{msg}</div>}
                      />{" "}
                    </div>

                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className=" w-[160px] mt-6 h-[50px] focus:outline-none text-primary border border-primary hover:bg-primary rounded hover:text-white text-base font-semibold"
                    >
                      {isloading ? <Spinner /> : "Update"}
                    </button>
                  </div>
                )}
              </Formik>
            )}
          </Popup>
        </div>
      </div>
    </AuthRoute>
  );
};

export default OrganizationList;
