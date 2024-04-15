import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {
  useAddMenuMutation,
  useEditMenuMutation,
  useGetAllMenuQuery,
  useRemoveMenuMutation,
} from "src/redux/api/downloadApi";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuForm = ({ prefillData, editBtnTitle }) => {
  const [menuData, setMenuData] = useState({ title: "" });
  const [addMenu] = useAddMenuMutation();
  const [editMenu] = useEditMenuMutation();
  const { refetch } = useGetAllMenuQuery();

  const handleSubmit = async () => {
    try {
      const result = prefillData
        ? await editMenu({ _id: prefillData._id, menuData })
        : await addMenu(menuData);

      if (result.data.status === 200 || result.data.status === 201) {
        refetch();
        setMenuData({ title: "" });
        const hoverPause = prefillData ? false : true;
        toast.success(`🦄 ${result.data.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: hoverPause,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      console.log("====================================");
      console.log("Error-----");
      console.log("====================================");
    } catch (error) {
      console.error("Error response:", error);
    }
  };

  useEffect(() => {
    if (prefillData) {
      setMenuData({
        title: prefillData.title || "",
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
        label="menu"
        variant="standard"
        color="success"
        placeholder="Enter Menu name"
        value={menuData?.title}
        onChange={(val) => {
          setMenuData({ ...menuData, title: val.target.value });
        }}
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
          {prefillData ? editBtnTitle : "Add Menu"}
        </Button>
      </div>
    </Box>
  );
};

export default MenuForm;
