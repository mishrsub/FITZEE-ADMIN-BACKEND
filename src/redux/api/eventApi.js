import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const workshopAPI = createApi({
  reducerPath: "workshopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/workshop/",
  }),
  endpoints: (builder) => ({
    getWorkshops: builder.query({
      query: () => "/getWorkshop", // Corrected typo here
    }),
    deleteWorkshop: builder.mutation({
      query: (id) => ({
        url: `/deleteWorkshop/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// 35.154.95.255:8000/api/workshop/deleteWorkshop/65d71e8351631f98c555b10e
export const {
  useGetWorkshopsQuery,
  useDeleteWorkshopMutation
} = workshopAPI;
