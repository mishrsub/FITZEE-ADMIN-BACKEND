import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddNewsMutation, useEditNewsMutation, useGetNewsQuery } from "src/redux/api/newsApi";

export default function  NewsForm({ editBtnTitle, prefillData })  {
  const [newsData, setNewsData] = React.useState({
    author: "",
    title: "",
    description: "",
  });

  const { refetch } = useGetNewsQuery();
  const [addNews] = useAddNewsMutation();
  const [editNews] = useEditNewsMutation();

  const addNewNews = async () => {
    try {
      if (editBtnTitle && prefillData) {
        const { data, error } = await editNews({ updatedData: newsData, id: prefillData._id });

        if (data && data.status === 200) {
          toast.success(`🦄 ${data.message}`, {
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
          refetch(); // Refetch data after editing news
        } else if (error) {
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
      } else {
        const { data, error } = await addNews(newsData);

        if (data && data.status === 201) {
          toast.success(`🦄 ${data.message}`, {
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
          refetch(); // Refetch data after adding news
          setNewsData({
            author: "",
            title: "",
            description: "",
          });
        } else if (error) {
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
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  React.useEffect(() => {
    if (prefillData) {
      setNewsData({
        author: prefillData.author,
        title: prefillData.title,
        description: prefillData.description,
      });
    } else {
      setNewsData({
        author: "",
        title: "",
        description: "",
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
        label="Author"
        variant="standard"
        color="success"
        value={newsData.author}
        onChange={(ev) => setNewsData({ ...newsData, author: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        color="success"
        value={newsData.title}
        onChange={(ev) => setNewsData({ ...newsData, title: ev.target.value })}
      />
      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        color="success"
        value={newsData.description}
        onChange={(ev) => setNewsData({ ...newsData, description: ev.target.value })}
      />
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{
            marginTop: "10px",
          }}
          onClick={addNewNews}
        >
          {editBtnTitle ? "Edit news" : "Add news"}
        </Button>
      </div>
    </Box>
  );
};


