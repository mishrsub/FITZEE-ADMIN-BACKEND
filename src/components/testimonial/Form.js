import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addTestimonialData, editTestimonialData } from "src/redux/apiReuse/courseFun";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetTestimonialQuery } from "src/redux/api/testimonialApi";

export default function TestimonialForm({ editBtnTitle, prefillData }) {
  const [testimonialData, setTestimonialData] = React.useState({
    image: null,
    name: "",
    program: "",
    description: "",
    rank: "",
  });
  const { refetch } = useGetTestimonialQuery();

  const addTestimonial = async () => {
    const formData = new FormData();

    formData.append("name", testimonialData.name);
    formData.append("program", testimonialData.program);
    formData.append("description", testimonialData.description);
    formData.append("image", testimonialData.image);
    formData.append("rank", testimonialData.rank);

    if (prefillData && editBtnTitle) {
      const responseData = await editTestimonialData(testimonialData, prefillData._id);
      if (responseData.status === 200) {
        setTestimonialData((prev) => ({...prev,testimonialData}));
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
    } else {
      const responseData = await addTestimonialData(testimonialData);
      if (responseData.status === 201) {
        setTestimonialData({
          image: null,
          name: "",
          program: "",
          description: "",
          rank: "",
        });
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
  console.log("====================================");
  console.log("PREFILLLLLLL DATA: ", prefillData);
  console.log("====================================");

  React.useEffect(() => {
    if (prefillData) {
      setTestimonialData({
        image: prefillData.image,
        name: prefillData.name,
        program: prefillData.program,
        description: prefillData.description,
        rank: prefillData.rank,
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
        label="Name"
        variant="standard"
        color="success"
        value={testimonialData.name}
        onChange={(ev) => setTestimonialData({ ...testimonialData, name: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Rank"
        variant="standard"
        color="success"
        value={testimonialData.rank}
        onChange={(ev) => setTestimonialData({ ...testimonialData, rank: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Program"
        variant="standard"
        color="success"
        value={testimonialData.program}
        onChange={(ev) => setTestimonialData({ ...testimonialData, program: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        color="success"
        value={testimonialData.description}
        onChange={(ev) => setTestimonialData({ ...testimonialData, description: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        variant="standard"
        label="Image"
        type="file"
        sx={{ marginBottom: "8px" }}
        // value={testimonialData.image}
        onChange={(ev) => setTestimonialData({ ...testimonialData, image: ev.target.files[0] })}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{
            marginTop: "10px",
          }}
          onClick={addTestimonial}
        >
          {editBtnTitle ? "Edit testimonial" : "Add testimonial"}
        </Button>
      </div>
    </Box>
  );
}
