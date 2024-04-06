import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useAddClassMutation, useEditClassMutation, useGetCoursesQuery } from "src/redux/api/courseApi";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClassForm = ({ prefillData, editBtnTitle }) => {
  
  const [classData, setClassData] = useState({ className: "" });
  const [addClass] = useAddClassMutation();
  const [editClass] = useEditClassMutation();
  const { refetch } = useGetCoursesQuery();


  const handleSubmit = async () => {
    try {
      const result = prefillData
        ? await editClass({ _id: prefillData._id, classData })
        : await addClass(classData);

      if (result.data.status === 200 || result.data.status === 201) {
        refetch();
        setClassData({ className: "" });
        const hoverPause = prefillData ? false : true;
        toast.success(`🦄 ${result.data.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: hoverPause,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      console.log("====================================");
      console.log("Error-----");
      console.log("====================================");
    } catch (error) {
      console.error("Error response:", error);
    }
  };

  useEffect(() => {
    if (prefillData) {
      setClassData({
        className: prefillData.name || "",
      });
    }
  }, [prefillData]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="class"
        variant="standard"
        color="success"
        placeholder="Enter class name format -> V"
        value={classData?.className}
        onChange={(val) => {
          setClassData({ ...classData, className: val.target.value.toUpperCase() });
        }}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{
            marginTop: "10px",
            fontSize: "12px",
          }}
          onClick={handleSubmit}
        >
          {prefillData ? editBtnTitle : "Add Class"}
        </Button>
      </div>
    </Box>
  );
};

export default ClassForm;
