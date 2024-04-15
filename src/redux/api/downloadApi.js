import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const downloadAPI = createApi({
  reducerPath: "downloadAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/downloads/menu/",
  }),
  endpoints: (builder) => ({
    getAllMenu: builder.query({
      query: () => "", // Corrected typo here
    }),
    addMenu: builder.mutation({
      query: (menuData) => ({
        url: "",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      }),
    }),
    removeMenu: builder.mutation({
      query: ({ _id }) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
    }),
    editMenu: builder.mutation({
      query: ({ menuData, _id }) => ({
        url: `/${_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      }),
    }),
  }),
});

export const {
  useGetAllMenuQuery,
  useAddMenuMutation,
  useEditMenuMutation,
  useRemoveMenuMutation,
} = downloadAPI;
