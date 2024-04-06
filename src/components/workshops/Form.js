import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { editResultApi } from "src/redux/apiReuse/resultFun";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editWorkshop } from "src/redux/apiReuse/event";

export default function WorkshopForm({ editBtnTitle, prefillData }) {
  const [updatedData, setUpdatedData] = React.useState(prefillData);
  // const [courseType, setCourseType] = React.useState("paid");
  const [workshopData, setWorkshopData] = React.useState({
    image: null,
    title: "",
    description: "",
    address: "",
    timing: null,
    catalog: "paid",
  });

  const handleCourseTypeChange = (event) => {
    setWorkshopData({...workshopData,catalog:event.target.value});
  };

  const handleInputChange = (fieldName, value) => {
    setWorkshopData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const editResult = async () => {
    const formData = new FormData();

    formData.append("image", workshopData.image);
    formData.append("title", workshopData.title);
    formData.append("description", workshopData.description);
    formData.append("address", workshopData.address);
    formData.append("timing", workshopData.timing);
    formData.append("catalog", workshopData.catalog);

    console.log("====================================");
    console.log("Workshop data: ", workshopData);
    console.log("====================================");
    const responseData = await editWorkshop(workshopData, prefillData._id);

    if (prefillData && editBtnTitle) {
      if (responseData.status === 200) {
        setWorkshopData((prev) => ({ ...prev, workshopData }));
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
      setWorkshopData({
        image: prefillData.image,
        title: prefillData.title,
        description: prefillData.description,
        address: prefillData.address,
        timing: prefillData.timing,
        catalog: prefillData.catalog,
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
        label="Title"
        variant="standard"
        color="success"
        value={workshopData.title}
        onChange={(ev) => setWorkshopData({ ...workshopData, title: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        color="success"
        value={workshopData.description}
        onChange={(ev) => setWorkshopData({ ...workshopData, description: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Address"
        variant="standard"
        color="success"
        value={workshopData.address}
        onChange={(ev) => setWorkshopData({ ...workshopData, address: ev.target.value })}
      />
      <DatePicker
        label="Timing"
        value={new Date(workshopData?.timing) || (updatedData && new Date(updatedData.timing))}
        onChange={(date) => handleInputChange("timing", date)}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        label="Image"
        type="file"
        sx={{ marginBottom: "8px" }}
        // value={testimonialData.image}
        onChange={(ev) => setWorkshopData({ ...workshopData, image: ev.target.files[0] })}
      />
      <RadioGroup
        name="radio-buttons-group"
        sx={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} // Align items in a row
        value={workshopData.catalog}
        onChange={handleCourseTypeChange}
      >
        <FormLabel sx={{ marginRight: "10px", display: "inline" }}>Type: </FormLabel>
        <FormControlLabel
          value="upcoming"
          control={
          <Radio 
            size="small" 
            color="success" 
            />
          }
          label="Upcoming"
          sx={{ marginRight: "20px" }} // Adjust spacing as needed
        />
        <FormControlLabel 
        value="paid" 
        control={<Radio color="secondary" />} 
        label="Paid" 
        />
      </RadioGroup>

      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{
            marginTop: "10px",
          }}
          onClick={editResult}
        >
          {editBtnTitle ?? "Edit Workshop"}
        </Button>
      </div>
    </Box>
  );
}
