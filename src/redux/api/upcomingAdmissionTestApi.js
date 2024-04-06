import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const upcomingAdmissionAPI = createApi({
  reducerPath: "upcomingAdmissionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/upcomingTest/",
  }),
  endpoints: (builder) => ({
    addUpcomingAdmission: builder.mutation({
      query: (upcomingAdmissionData) => ({
        url: "addUpcomingUpcomingTest", // Replace with the actual endpoint URL
        method: "POST", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: upcomingAdmissionData, // The data you want to send in the request body
      }),
    }),
    getUpcomingAdmission: builder.query({
      query: () => "getUpcomingTest", // Corrected typo here
    }),
    editUpcomingAdmission: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/editUpcomingTest/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "PATCH", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: updatedData, // The updated data you want to send in the request body
      }),
    }),
    deleteUpcomingAdmission: builder.mutation({
      query: (id) => ({
        url: `/deleteUpcomingTest/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "DELETE", // Adjust the HTTP method as needed
      }),
    }),
  }),
});

export const {
  useAddUpcomingAdmissionMutation,
  useDeleteUpcomingAdmissionMutation,
  useEditUpcomingAdmissionMutation,
  useGetUpcomingAdmissionQuery
} = upcomingAdmissionAPI;
