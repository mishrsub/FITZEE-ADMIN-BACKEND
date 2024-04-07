import axios from "axios";

//Add testimonial data
export const addCompProgram = async(params,bodyData) =>{
  try {
    const config = {
      headers:{
        "Content-Type":"multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    }

    const response = await axios.post(`http://35.154.95.255:8000/api/course/competitive/addProgram/${params}`,bodyData,config);

    return response.data;
  } catch (error) {
      return error.response;
  }
}


export const editCompProgram = async(params,bodyData) =>{
  try {
    const config = {
      headers:{
        "Content-Type":"multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    }

    const response = await axios.patch(`http://35.154.95.255:8000/api/course/competitive/editProgram/${params}`,bodyData,config);

    return response.data;
  } catch (error) {
      return error.response;
  }
}


export const addProgramDetail = async(bodyData) =>{
  try {
    const config = {
      headers:{
        "Content-Type":"multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    }

    const response = await axios.post(`http://35.154.95.255:8000/api/course/competitive/addProgramDetail`,bodyData,config);

    return response.data;
  } catch (error) {
      return error.response;
  }
}