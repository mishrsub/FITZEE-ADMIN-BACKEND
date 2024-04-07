import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const newsAPI = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/mainNews/",
  }),
  endpoints: (builder) => ({
    addNews: builder.mutation({
      query: (newsData) => ({
        url: "/addNews", // Replace with the actual endpoint URL
        method: "POST", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: newsData, // The data you want to send in the request body
      }),
    }),
    getNews: builder.query({
      query: () => "/getNews", // Corrected typo here
    }),
    editNews: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/editNews/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "PATCH", // Adjust the HTTP method as needed
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
        },
        body: updatedData, // The updated data you want to send in the request body
      }),
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/deleteNews/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "DELETE", // Adjust the HTTP method as needed
      }),
    }),
  }),
});

export const {
  useAddNewsMutation,
  useDeleteNewsMutation,
  useEditNewsMutation,
  useGetNewsQuery
} = newsAPI;
