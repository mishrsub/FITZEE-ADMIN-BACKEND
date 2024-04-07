import axios from "axios";

export const addResult = async(bodyData) =>{
  try {
    const config = {
      headers:{
        "Content-Type":"multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    }

    const response = await axios.post(`http://35.154.95.255:8000/api/course/result`,bodyData,config);

    return response.data;
  } catch (error) {
      return error.response;
  }
}

export const addResultYear = async(bodyData) =>{
    try {
      const config = {
        headers:{
          "Content-Type":"multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        }
      }
  
      const response = await axios.post(`http://35.154.95.255:8000/api/course/result/addYear`,bodyData,config);
  
      return response.data;
    } catch (error) {
        return error.response;
    }
  }


  export const editResultApi = async(bodyData,params) =>{
    try {
      const config = {
        headers:{
          "Content-Type":"multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        }
      }
  
      const response = await axios.patch(`http://35.154.95.255:8000/api/course/result/${params}`,bodyData,config);
  
      return response.data;
    } catch (error) {
        return error.response;
    }
  }