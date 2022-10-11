import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutHeader } from "./shared";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithoutHeader,
  endpoints: (builder) => ({
    organizationSignup: builder.mutation({
      query: (data) => {
        return {
          url: `register`,
          method: "post",
          body: data,
        };
      },
    }),
    organizationSignin: builder.mutation({
      query: (data) => {
        return {
          url: `user-login`,
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useOrganizationSigninMutation, useOrganizationSignupMutation } = authApi;
