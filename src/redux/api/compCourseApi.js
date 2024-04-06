import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const compCourseAPI = createApi({
  reducerPath: "compCourseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/course/competitive/",
  }),
  endpoints: (builder) => ({
    getCompClass: builder.query({
      query: () => "", // Corrected typo here
    }),
    addCompClass: builder.mutation({
      query: (classData) => ({
        url: "/addClass",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      }),
    }),
    removeCompClass: builder.mutation({
      query: ({ classData, _id }) => ({
        url: `/deleteClass/${_id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      }),
    }),
    editCompClass: builder.mutation({
      query: ({ classData, _id }) => ({
        url: `/editClass/${_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      }),
    }),
    addCompProgram: builder.mutation({
      query: ({ program, _id }) => ({
        url: `addProgram/${_id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
      }),
    }),
    editCompProgram: builder.mutation({
      query: ({ program, _id }) => ({
        url: `editProgram/${_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
      }),
    })
  }),
});

export const {
  useAddCompClassMutation,
  useAddCompProgramMutation,
  useEditCompClassMutation,
  useEditCompProgramMutation,
  useGetCompClassQuery,
} = compCourseAPI;
