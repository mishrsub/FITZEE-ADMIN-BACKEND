import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const adminAPI = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/admin/",
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
    emailVerify: builder.mutation({
      query: (data) => ({
        url: `/forget/request`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useEmailVerifyMutation } = adminAPI;
