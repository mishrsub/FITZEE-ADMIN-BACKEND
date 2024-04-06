import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const testimonialAPI = createApi({
  reducerPath: "testimonialApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/testimonial/",
  }),
  endpoints: (builder) => ({
    addTestimonial: builder.mutation({
      query: (testimonialData) => ({
        url: "addTestimonial", // Replace with the actual endpoint URL
        method: "POST", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
        body: testimonialData, // The data you want to send in the request body
      }),
    }),
    getTestimonial: builder.query({
      query: () => "getTestimonial", // Corrected typo here
    }),
    editTestimonial: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/editTestimonial/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "PATCH", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
        body: updatedData, // The updated data you want to send in the request body
      }),
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/deleteTestimonial/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "DELETE", // Adjust the HTTP method as needed
      }),
    }),
  }),
});

export const {
  useAddTestimonialMutation,
  useDeleteTestimonialMutation,
  useEditTestimonialMutation,
  useGetTestimonialQuery
} = testimonialAPI;
