import axios from "axios";

export const addWorkshop = async(bodyData) =>{
  try {
    const config = {
      headers:{
        "Content-Type":"multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    }

    const response = await axios.post(`http://35.154.95.255:8000/api/workshop/addWorkshop`,bodyData,config);

    return response.data;
  } catch (error) {
      return error.response;
  }
}



export const editWorkshop = async(bodyData,params) =>{
  try {
    const config = {
      headers:{
        "Content-Type":"multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      }
    }

    const response = await axios.patch(`http://35.154.95.255:8000/api/workshop/editWorkshop/${params}`,bodyData,config);

    return response.data;
  } catch (error) {
      return error.response;
  }
}
