import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addNewsData, editRecentNews } from "src/redux/apiReuse/courseFun";
import { toast, Bounce } from "react-toastify";
import Textarea from '@mui/joy/Textarea';
import { useGetNewsQuery } from "src/redux/api/recentNewsApi";


export default function RecentNews({ prefillData, editBtnTitle }) {
  const [newsData, setNewsData] = React.useState({
    image: null,
    title: "",
    description: "",
  });
  const { refetch } = useGetNewsQuery();

  const addNews = async () => {
    if (!prefillData && !editBtnTitle) {
      const formData = new FormData();

      formData.append("title", newsData.title);
      formData.append("description", newsData.description);
      formData.append("image", newsData.image);

      const response = await addNewsData(newsData);

      if (response.status === 201) {
        setNewsData({
          image: null,
          title: "",
          description: "",
        });
        toast.success(`🦄 ${response.message}`, {
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
      if (response.status === 400) {
        toast.error(`🦄 ${response.data.error}`, {
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
      const response = await editRecentNews(newsData, prefillData._id);
      if (response.status === 200) {
        setNewsData((prev) => ({...prev,newsData}));
        toast.success(`🦄 ${response.message}`, {
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
      if (response.status === 400) {
        toast.error(`🦄 ${response.data.error}`, {
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
      setNewsData({
        image: prefillData.image,
        title: prefillData.title,
        description: prefillData.description,
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
        value={newsData.title}
        onChange={(e) => setNewsData((prevData) => ({ ...prevData, title: e.target.value }))}
      />

      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        color="success"
        value={newsData.description}
        onChange={(e) => setNewsData((prevData) => ({ ...prevData, description: e.target.value }))}
      />

      {/* <Textarea color="success" minRows={2} />   */}

      <TextField
        id="standard-basic"
        variant="standard"
        label="Image"
        type="file"
        sx={{ marginBottom: "8px" }}
        onChange={(e) => setNewsData((prevData) => ({ ...prevData, image: e.target.files[0] }))}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{
            marginTop: "10px",
          }}
          onClick={addNews}
        >
          {editBtnTitle ? "Edit Blog" : "Add Blog"}
        </Button>
      </div>
    </Box>
  );
}
