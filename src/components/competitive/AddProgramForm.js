import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete, Button, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCompClassQuery } from "src/redux/api/compCourseApi";
import { addCompProgram, editCompProgram } from "src/redux/apiReuse/comCourseFun";

export default function AddCompetitiveProgram({ editBtnTitle, classData, selectedProgram }) {
  const [className, setClassName] = React.useState("");
  const [program, setProgram] = React.useState({
    image: null,
    heading: "",
    organisingBody: "",
    eligibleClass: [],
    about: "",
  });
  const { data: courses } = useGetCompClassQuery();

  console.log("====================================");
  console.log("CLASS DATA:----> ", classData);
  console.log("====================================");

  const selectParticularClass = courses.class.find((val) => val.name === classData);
  const selectParticularProgram = selectParticularClass?.programs.find(
    (val) => val.heading === selectedProgram
  );
  console.log("====================================");
  console.log("Choosing class: ", selectParticularProgram);
  console.log("====================================");

  const handleChange = (event, key) => {
    setProgram({ ...program, [key]: event.target.value });
  };

  const handleInputChange = (fieldName, value) => {
    setProgram((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if(selectedProgram && selectParticularProgram && editBtnTitle) {
        const formdata = new FormData();
        let course = courses.class.find((val) => val.name === className);
  
        formdata.append("image", program.image);
        formdata.append("heading", program.heading);
        formdata.append("organisingBody", program.organisingBody);
        formdata.append("eligibleClass", program.eligibleClass);
        formdata.append("about", program.about);
  
        const editProgram = await editCompProgram(selectParticularProgram._id, formdata);
  
        console.log("====================================");
        console.log("Program added: ", editProgram);
        console.log("====================================");
  
        if (editProgram?.status === 200) {
          toast.success(`🦄 ${editProgram.message}!`, {
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
        if (editProgram.status === 400) {
          toast.error(`🦄 ${editProgram.data.error}`, {
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
      } else {
        const formdata = new FormData();
        let course = courses.class.find((val) => val.name === className);
  
        formdata.append("image", program.image);
        formdata.append("heading", program.heading);
        formdata.append("organisingBody", program.organisingBody);
        formdata.append("eligibleClass", program.eligibleClass);
        formdata.append("about", program.about);
  
        const addProgram = await addCompProgram(course._id, formdata);
  
        console.log("====================================");
        console.log("Program added: ", addProgram);
        console.log("====================================");
  
        if (addProgram?.status === 201) {
          setClassName("");
          setProgram({
            image: null,
            heading: "",
            organisingBody: "",
            eligibleClass: [],
            about: "",
          });
  
          toast.success(`🦄 ${addProgram.message}!`, {
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
        if (addProgram.status === 400) {
          toast.error(`🦄 ${addProgram.data.error}`, {
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

  React.useEffect(() => {
    if (selectedProgram) {
      setProgram((prevProgram) => ({
        ...prevProgram,
        organisingBody: selectParticularProgram?.organisingBody ?? "",
        eligibleClass: selectParticularProgram?.eligibleClass ?? [],
        about: selectParticularProgram?.about ?? "",
        heading: !selectParticularProgram? "" : selectedProgram,
      }));
    }
  }, [selectedProgram, selectParticularProgram]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {!editBtnTitle && (
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
            {courses?.class.map((option) => (
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
        label="Heading/Program"
        variant="standard"
        color="success"
        placeholder="Enter program name"
        value={program.heading}
        onChange={(e) => handleChange(e, "heading")}
      />

      <TextField
        id="standard-basic"
        label="Organising body"
        variant="standard"
        color="success"
        placeholder="Enter organiser"
        value={program.organisingBody}
        onChange={(e) => handleChange(e, "organisingBody")}
      />

      <TextField
        id="standard-basic"
        label="About"
        variant="standard"
        color="success"
        placeholder="Enter organiser"
        value={program.about}
        onChange={(e) => handleChange(e, "about")}
      />

      <Autocomplete
        multiple
        id="Eligible class"
        options={["X", "XI", "XI", "12TH PASS"]}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} 
          label="Eligible class" 
          variant="standard" 
          color="success" 
          />
        )}
        value={program.eligibleClass.map((item) => item)}
        onChange={(event, newValue) => {
          handleInputChange(
            "eligibleClass",
            newValue.map((subject) => subject)
          );
        }}
      />

      <TextField
        id="standard-basic"
        variant="standard"
        label="Image"
        type="file"
        sx={{ marginBottom: "8px" }}
        onChange={(ev) => setProgram({ ...program, image: ev.target.files[0] })}
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
          {editBtnTitle ? `Edit Program` : `Add Program`}
        </Button>
      </div>
    </Box>
  );
}
