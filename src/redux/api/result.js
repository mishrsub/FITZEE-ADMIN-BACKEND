import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const resultAPI = createApi({
  reducerPath: "resultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/course/result",
  }),
  endpoints: (builder) => ({
    getResults: builder.query({
      query: () => "", // Corrected typo here
    }),
  }),
});

export const {
  useGetResultsQuery
} = resultAPI;
