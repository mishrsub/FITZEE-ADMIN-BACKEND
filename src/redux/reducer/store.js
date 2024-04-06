import { configureStore } from "@reduxjs/toolkit";
import { testimonialAPI } from "../api/testimonialApi";
import { recentnewsAPI } from "../api/recentNewsApi";
import { upcomingAdmissionAPI } from "../api/upcomingAdmissionTestApi";
import { courseAPI } from "../api/courseApi";
import { resultAPI } from "../api/result";
import { contactAPI } from "../api/contactApi";
import { workshopAPI } from "../api/eventApi";
import { compCourseAPI } from "../api/compCourseApi";
import { newsAPI } from "../api/newsApi";
import { adminAPI } from "../api/adminApi";

export const store = configureStore({
  reducer: {
    [testimonialAPI.reducerPath]: testimonialAPI.reducer,
    [recentnewsAPI.reducerPath]: recentnewsAPI.reducer,
    [upcomingAdmissionAPI.reducerPath]: upcomingAdmissionAPI.reducer,
    [courseAPI.reducerPath]: courseAPI.reducer,
    [resultAPI.reducerPath]:resultAPI.reducer,
    [contactAPI.reducerPath]:contactAPI.reducer,
    [workshopAPI.reducerPath]:workshopAPI.reducer,
    [compCourseAPI.reducerPath]:compCourseAPI.reducer,
    [newsAPI.reducerPath]:newsAPI.reducer,
    [adminAPI.reducerPath]:adminAPI.reducer
  },
  middleware: (mid) => [
    ...mid(),
    testimonialAPI.middleware,
    recentnewsAPI.middleware,
    upcomingAdmissionAPI.middleware,
    courseAPI.middleware,
    resultAPI.middleware,
    contactAPI.middleware,
    workshopAPI.middleware,
    compCourseAPI.middleware,
    newsAPI.middleware,
    adminAPI.middleware
  ],
});
