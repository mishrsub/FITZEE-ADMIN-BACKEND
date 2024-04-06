import React, { useState, useEffect } from 'react';
import { Box, Typography, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { useGetCoursesQuery, useAddProgramMutation, useEditProgramMutation } from 'src/redux/api/courseApi';
import { Bounce, toast } from 'react-toastify';

export default function ProgramForm({ editBtnTitle, classData, selectedProgram }) {
  const [className, setClassName] = useState("Select Class");
  const [programName, setProgramName] = useState("");
  const { data: courses,refetch } = useGetCoursesQuery();
  const [addProgram] = useAddProgramMutation();
  const [editProgram] = useEditProgramMutation();

  useEffect(() => {
    if (selectedProgram) {
      setProgramName(selectedProgram);
    }
  }, [selectedProgram]);

  const handleSubmit = async () => {
    try {
      let targetProgramId;

      if (classData) {
        const course = courses.class.find((val) => val.name === classData);
        const findProgram = course.programs.find((val) => val.name === selectedProgram);
        targetProgramId = findProgram._id.toString();
      } else {
        const course = courses.class.find((val) => val.name === className);
        targetProgramId = course._id.toString();
      }

      const result = classData
        ? await editProgram({ program: { programName }, _id: targetProgramId })
        : await addProgram({ program: { programName }, _id: targetProgramId });

      if (result?.data?.status === 201 || result?.data?.status === 200) {
        refetch();
        setClassName("");
        setProgramName("");
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
      } else if (result?.error?.data?.status === 400) {
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
    sx={{ "& > :not(style)": { m: 1, width: "30ch" } }} 
    noValidate 
    autoComplete="off"
    >
      {classData ? (
        <Typography 
        variant="" 
        sx={{ fontWeight: 600, color: "#10B981" 
        }}>
          {`Class ${classData}`}
        </Typography>
      ) : (
        <>
          <InputLabel id="demo-select-small-label">Program Category</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={className}
            label="Program"
            onChange={(e) => setClassName(e.target.value)}
            sx={{ height: "100%" }}
          >
            <MenuItem value="Select Class">Select Class</MenuItem>
            {courses.class.map((option) => (
              <MenuItem 
              key={option.value} 
              value={option.name} 
              disabled={option.disabled}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}

      <TextField
        id="standard-basic"
        label="Program"
        variant="standard"
        color="success"
        placeholder="Enter program name"
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{ marginTop: "10px", fontSize: "12px" }}
          onClick={handleSubmit}
        >
          {editBtnTitle ? `Edit Program` : `Add Program`}
        </Button>
      </div>
    </Box>
  );
}
