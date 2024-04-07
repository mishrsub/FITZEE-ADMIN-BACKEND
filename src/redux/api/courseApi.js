import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const courseAPI = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://35.154.95.255:8000/api/course/",
  }),
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "", // Corrected typo here
    }),
    addClass: builder.mutation({
      query: (classData) => ({
        url: "addClass",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      }),
    }),
    removeClass: builder.mutation({
      query: ({ _id }) => ({
        url: `/deleteClass/${_id}`,
        method: "DELETE",
      }),
    }),
    editClass: builder.mutation({
      query: ({ classData, _id }) => ({
        url: `/editClass/${_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      }),
    }),
    addProgram: builder.mutation({
      query: ({ program, _id }) => ({
        url: `addProgram/${_id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
      }),
    }),
    editProgram: builder.mutation({
      query: ({ program, _id }) => ({
        url: `editProgram/${_id}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(program),
      }),
    }),
    addSubProgram: builder.mutation({
      query: ({ program, _id }) => {
        return {
          url: `addSubProgram/${_id}`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: program, //add this line 👈
        };
      },
    }),
    editSubProgram: builder.mutation({
      query: ({ program, _id1,_id2 }) => {
        console.log("====================================");
        console.log("PROGRAM DATA: ", program);
        console.log("====================================");

        return {
          url: `editSubProgram/${_id1}/${_id2}`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: program, //add this line 👈
        };
      },
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useAddClassMutation,
  useEditClassMutation,
  useRemoveClassMutation,
  useAddProgramMutation,
  useEditProgramMutation,
  useAddSubProgramMutation,
  useEditSubProgramMutation
} = courseAPI;
