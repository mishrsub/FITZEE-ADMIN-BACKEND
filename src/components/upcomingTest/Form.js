import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  useAddUpcomingAdmissionMutation,
  useEditUpcomingAdmissionMutation,
  useGetUpcomingAdmissionQuery,
} from "src/redux/api/upcomingAdmissionTestApi";
import Modals from "src/components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpcomingAdmissionForm({ prefillData, editBtnTitle }) {
  const [updatedData, setUpdatedData] = useState(prefillData);
  const [examData, setExamData] = useState({
    urlName: "",
    examName: "",
    examDate: new Date(),
    eligibleClass: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const [addUpcomingAdmission, { data, error, isLoading }] = useAddUpcomingAdmissionMutation();
  const [editUpcomingAdmission, { isError }] = useEditUpcomingAdmissionMutation();
  const { refetch } = useGetUpcomingAdmissionQuery();

  useEffect(() => {
    setExamData((prevData) => ({
      ...prevData,
      urlName: prefillData.urlName,
      examName: prefillData.examName,
      examDate: new Date(prefillData.examDate),
      eligibleClass: prefillData.eligibleClass,
    }));
  }, [prefillData]);
  

  const handleInputChange = (fieldName, value) => {
    setExamData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (prefillData) {
        response = await editUpcomingAdmission({
          id: prefillData._id,
          updatedData: examData,
        });
      } else {
        response = await addUpcomingAdmission(examData);
      }

      if (response?.data?.status === 201 || response?.data?.status === 200) {
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        refetch();
        handleCloseModal(); // Close the modal after success
      } else if (response?.error?.data?.status === 400) {
        toast.error(response?.error?.data?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "28ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="examName"
        label="Exam Name"
        variant="standard"
        color="success"
        value={examData?.examName || updatedData?.examName}
        onChange={(e) => handleInputChange("examName", e.target.value)}
      />
      <TextField
        id="urlName"
        label="Url"
        variant="standard"
        color="success"
        value={examData?.urlName || updatedData?.urlName}
        onChange={(e) => handleInputChange("urlName", e.target.value)}
      />
      <DatePicker
        label="Exam Date"
        value={new Date(examData?.examDate) || (updatedData && new Date(updatedData.examDate))}
        onChange={(date) => handleInputChange("examDate", date)}
      />
      <Autocomplete
        multiple
        id="eligibleClass"
        options={["V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "12 PASSED"]}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Eligible Class" variant="standard" color="success" />
        )}
        value={
          examData.eligibleClass.map((item) => item.className) ||
          updatedData.eligibleClass.map((item) => item.className)
        }
        onChange={(event, newValue) => {
          handleInputChange(
            "eligibleClass",
            newValue.map((className) => ({ className }))
          );
        }}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{ marginTop: "10px" }}
          onClick={handleSubmit}
        >
          {editBtnTitle || "Add Test"}
        </Button>
      </div>
      <Modals
        title="Add Upcoming Test"
        open={isModalOpen}
        handleClose={handleCloseModal}
        Form={UpcomingAdmissionForm}
      />
      <ToastContainer />
    </Box>
  );
}
