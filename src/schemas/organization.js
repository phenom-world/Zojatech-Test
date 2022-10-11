import * as Yup from "yup";

export const initialSignUpValue = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export const initialUserDetails = {
  id: "",
  name: "",
  street: "",
  city: "",
  state: "",
  country: "",
};

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string().email("Invalid email format").trim().required("Email is a required field"),
  password: Yup.string().required("Password is required").min(8, "minimum of 8 characters"),
  password_confirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const initialSigninValues = {
  email: "",
  password: "",
};

export const signinSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").trim().required("Email is a required field"),
  password: Yup.string().required("Password is required").min(8, "minimum of 8 characters"),
});

export const UpdateDetailsSchema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),
  street: Yup.string().required("Street is a required field"),
  city: Yup.string().required("City is a required field"),
  state: Yup.string().required("State is a required field"),
  country: Yup.string().required("Country is a required field"),
});
