export const addDownloadMenu = async (formData, _id) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await axios.post(
      `http://localhost:8000/api/downloads/menu/${_id.toString()}`,
      formData,
      config
    );

    // Handle success
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in Add sub:", error.response.data.error);
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

export const updateDownloadMenu = async (formData, menuId, subMenuId) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const response = await axios.patch(
      `http://localhost:8000/api/downloads/menu/${menuId.toString()}/${subMenuId.toString()}`,
      formData,
      config
    );

    // Handle success
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error in Update sub menu:", error.response.data.error);
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
