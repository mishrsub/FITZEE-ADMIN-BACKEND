import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import { editResultApi } from "src/redux/apiReuse/resultFun";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetResultsQuery } from "src/redux/api/result";

export default function ResultForm({ editBtnTitle, prefillData }) {
  
  const [updatedData, setUpdatedData] = React.useState(prefillData);
  const [resultData, setResultData] = React.useState({
    image: null,
    programName: "",
    eligibleClass: [],
    subjectsCovered: [],
    date: null,
  });
  const { refetch } = useGetResultsQuery();

  const handleInputChange = (fieldName, value) => {
    setResultData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const editResult = async () => {
    const formData = new FormData();
    formData.append("programName", resultData.name);
    formData.append("image", resultData.image);
    formData.append("eligibleClass", resultData.eligibleClass);
    formData.append("subject", resultData.subject);
    formData.append("date", resultData.date);

    console.log('====================================');
    console.log("Result data: ",resultData);
    console.log('====================================');
    const responseData = await editResultApi(resultData, prefillData._id);

    if (prefillData && editBtnTitle) {
      if (responseData.status === 200) {
        setResultData((prev) => ({ ...prev, resultData }));
        toast.success(`🦄 ${responseData.message}`, {
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
        refetch();
      }
      if (responseData.status === 400) {
        toast.error(`🦄 ${responseData.data.error}`, {
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
    }
  };

  React.useEffect(() => {
    if (prefillData) {
      setResultData({
        image: prefillData.image,
        programName: prefillData.programName,
        eligibleClass: prefillData.eligibleClass,
        subjectsCovered: prefillData.subjectsCovered,
        date: prefillData.date,
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
        label="Program Name"
        variant="standard"
        color="success"
        value={resultData.programName}
        onChange={(ev) => setResultData({ ...resultData, programName: ev.target.value })}
      />
      <Autocomplete
        multiple
        id="eligibleClass"
        options={["V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "12 PASSED"]}
        freeSolo
        renderInput={(params) => (
          <TextField 
          {...params} 
          label="Eligible Class" 
          variant="standard" 
          color="success" 
          />
        )}
        value={
          resultData.eligibleClass.map((item) => item.name) 
        }
        onChange={(event, newValue) => {
          handleInputChange(
            "eligibleClass",
            newValue.map((eligibleClass) => ({ name: eligibleClass }))
          );
        }}
      />
      <Autocomplete
        multiple
        id="subjectsCovered"
        options={["MATH", "PHYSICS", "CHEMISTRY", "SCIENCE"]}
        freeSolo
        renderInput={(params) => (
          <TextField 
          {...params} 
          label="Subjects Covered" 
          variant="standard" 
          color="success" 
          />
        )}
        value={
          resultData.subjectsCovered.map((item) => item.name) ||
          updatedData.subjectsCovered.map((item) => item.name)
        }
        onChange={(event, newValue) => {
          handleInputChange(
            "subjectsCovered",
            newValue.map((subject) => ({ name: subject }))
          );
        }}
      />
     <DatePicker
        label="Result Date"
        value={new Date(resultData?.date) || (updatedData && new Date(updatedData.date))}
        onChange={(date) => handleInputChange("date", date)}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        label="Image"
        type="file"
        sx={{ marginBottom: "8px" }}
        // value={testimonialData.image}
        onChange={(ev) => setResultData({ ...resultData, image: ev.target.files[0] })}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{
            marginTop: "10px",
          }}
          onClick={editResult}
        >
          {editBtnTitle ?? "Edit Result"}
        </Button>
      </div>
    </Box>
  );
}
