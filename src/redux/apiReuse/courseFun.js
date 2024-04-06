import axios from "axios";
import { useGetTestimonialQuery } from "../api/testimonialApi";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useGetTestimonial = () => {
  const { data: newData } = useGetTestimonialQuery();
  return newData.testimonial;
};


export const addSubProgramByAxios = async (formData, _id) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await axios.post(
      `http://35.154.95.255:8000/api/course/addSubProgram/${_id.toString()}`,
      formData,
      config
    );

    console.log("====================================");
    console.log(response);
    console.log("====================================");
    // Handle success
    return response.data;
  } catch (error) {
    // Handle error
    console.error(
      "Error in addSubProgramByAxios:",
      error.response.data.error
    );
    toast.warn(`🦄 ${error.response.data.error}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    throw error.message; // Rethrow the error to be caught in the calling function
  }
};

export const addProgramDetails = async (formData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await axios.post(
      "http://35.154.95.255:8000/api/course/addProgramDetail",
      formData,
      config
    );

    console.log("====================================");
    console.log(response);
    console.log("====================================");
    // Handle success
    return response.data;
  } catch (error) {
    // Handle error
    console.error(
      "Error in addSubProgramByAxios:",
      error.response.data.error
    );
    toast.warn(`🦄 ${error.response.data.error}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    throw error.message; // Rethrow the error to be caught in the calling function
  }
};

// Add testimonial data
export const addTestimonialData = async (bodyData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await axios.post(
      "http://35.154.95.255:8000/api/testimonial/addTestimonial",
      bodyData,
      config
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const editTestimonialData = async (bodyData, _id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await axios.patch(
      `http://35.154.95.255:8000/api/testimonial/editTestimonial/${_id}`,
      bodyData,
      config
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const addNewsData = async (bodyData) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await axios.post(
      `http://35.154.95.255:8000/api/news/addNews`,
      bodyData,
      config
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const editRecentNews = async (bodyData, _id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await axios.patch(
      `http://35.154.95.255:8000/api/news/editNews/${_id}`,
      bodyData,
      config
    );

    return response.data;
  } catch (error) {
    return error.response;
  }
};
