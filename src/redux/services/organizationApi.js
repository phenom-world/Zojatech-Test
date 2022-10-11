import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, createRequest } from "./shared";

export const organizationApi = createApi({
  reducerPath: "organizationApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrganization: builder.query({
      query: (id) => createRequest(`settings/get-organization/${id}`),
      transformResponse: (results) => results.data,
    }),
    updateOrganization: builder.mutation({
      query: (data) => {
        return {
          url: `settings/update-organization`,
          method: "POST",
          body: data,
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: `logout`,
          method: "post",
          body: {},
        };
      },
    }),
  }),
});

export const { useGetOrganizationQuery, useUpdateOrganizationMutation, useLogoutMutation } = organizationApi;
