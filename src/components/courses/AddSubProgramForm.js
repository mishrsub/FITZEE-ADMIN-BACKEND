import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useAddProgramMutation,
  useEditSubProgramMutation,
  useGetCoursesQuery,
} from "src/redux/api/courseApi";

const AddProgramForm = ({ editBtnTitle, prefillData, classData, selectedProgram, subprogram }) => {
  console.log("====================================");
  console.log("Edit button title: ", editBtnTitle);
  console.log("Prefill data: ", prefillData);
  console.log("====================================");

  const [program, setProgram] = useState({
    subprogramName: subprogram,
  });
  const { refetch } = useGetCoursesQuery();
  const [editSubProgram, { isLoading, error, isSuccess }] = useEditSubProgramMutation();

  const handleChange = (event, key) => {
    setProgram({ ...program, [key]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Selected Program ID:", classData);
      const course = prefillData.programs.find((val) => val.name === selectedProgram);
      const subprogramData = course.subprograms.find((val) => val.name === subprogram);

      console.log("GETTING PARTICULAR PROGRAM: ", subprogramData);

      const result = await editSubProgram({
        program,
        _id1: course._id.toString(),
        _id2: subprogramData._id.toString(),
      });

      if (result?.data?.status === 200) {
        refetch();
        toast.success(`🦄 ${result.data.message}!`, {
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
      }
      if (result?.error?.data?.status === 400) {
        toast.error(`🦄 ${result.error.data.error}`, {
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
      }
    } catch (error) {
      toast.error(`🦄 ${error.message}`, {
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
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography 
      variant="" 
      sx={{ fontWeight: 600, color: "#10B981" }}
      >
        {`Class ${classData} →`}
      </Typography>
      <Typography 
      variant="" 
      sx={{ fontWeight: 600, color: "#10B981" }}
      >
        {`${selectedProgram}`}
      </Typography>

      <TextField
        id="standard-basic"
        label="Subprogram"
        variant="standard"
        color="success"
        placeholder="Enter sub program name"
        value={program.subprogramName}
        onChange={(e) => handleChange(e, "subprogramName")}
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
          {editBtnTitle}
        </Button>
      </div>
    </Box>
  );
};

export default AddProgramForm;
