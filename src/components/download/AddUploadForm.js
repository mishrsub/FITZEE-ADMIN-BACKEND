import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
  FormLabel,
} from "@mui/material";
import { useGetAllMenuQuery } from "src/redux/api/downloadApi";
import { Bounce, toast } from "react-toastify";
import { addDownloadMenu } from "src/redux/apiReuse/downloadFun";

export default function AddUploadForm({ editBtnTitle, menuTitle, selectedMenu }) {
  const [menuName, setMenuName] = useState("Select Menu");
  const [upload, setUpload] = useState(null);
  const { data: menuData, refetch } = useGetAllMenuQuery();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", menuName);
      formData.append("file", upload);

      const result = await addDownloadMenu(formData);

      if (result?.status === 201 || result?.status === 200) {
        refetch();
        setMenuName("Select Menu"); // Reset menuName
        setUpload(null); // Reset upload
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
      } else if (result?.status === 400) {
        toast.error(`🦄 ${result.data.error}`, {
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
      <Grid item xs={12} md={6}>
        {menuTitle ? (
          <TextField
            id="standard-basic"
            label="Menu"
            variant="standard"
            color="success"
            value={selectedMenu}
            onChange={(e) => setMenuName(e.target.value)}
          />
        ) : (
          <>
            <InputLabel id="demo-select-small-label">Add menu</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={menuName}
              label="Program"
              onChange={(e) => setMenuName(e.target.value)} // Changed setClassName to setMenuName
              sx={{ height: "100%" }}
            >
              {menuData.menus.map((option) => (
                <MenuItem key={option._id} value={option.title} disabled={option.disabled}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="standard-basic"
          label="Sub-menu"
          variant="standard"
          color="success"
          value={selectedMenu}
          onChange={(e) => setMenuName(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormLabel sx={{ textAlign: "left", marginTop: 2 }}>Upload pdf</FormLabel>
        <input type="file" onChange={(e) => setUpload(e.target.files[0])} />
      </Grid>
      <div style={{ textAlign: "center" }}>
        <Button
          color="success"
          variant="outlined"
          sx={{ marginTop: "10px", fontSize: "12px" }}
          onClick={handleSubmit}
        >
          {editBtnTitle ? `Edit Detail` : `Add Detail`}
        </Button>
      </div>
    </Box>
  );
}
