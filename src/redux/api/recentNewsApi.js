import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const recentnewsAPI = createApi({
  reducerPath: "recentnewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/news/",
  }),
  endpoints: (builder) => ({
    addNews: builder.mutation({
      query: (newsData) => ({
        url: "addNews", // Replace with the actual endpoint URL
        method: "POST", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
        },
        body: newsData, // The data you want to send in the request body
      }),
    }),
    getNews: builder.query({
      query: () => "getNews", // Corrected typo here
    }),
    editNews: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/editNews/${id}`, // Replace with the actual endpoint URL, including the testimonial ID
        method: "PATCH", // Adjust the HTTP method as needed
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
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
} = recentnewsAPI;
