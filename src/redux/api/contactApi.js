import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const contactAPI = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/contact",
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/all", // Corrected typo here
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactsQuery,
  useDeleteContactMutation
} = contactAPI;
