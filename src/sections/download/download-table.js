import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useState } from "react";
import Modals from "src/components/Modal";
import AddMenuForm from "../../components/download/AddMenuForm";
import { useGetAllMenuQuery, useRemoveMenuMutation } from "src/redux/api/downloadApi";
import { Bounce, toast } from "react-toastify";

export const AddDownloadTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [open, setOpen] = useState(false);
  const [menuData, setMenuData] = useState({});
  const [removeMenu, { isLoading, isError, isSuccess }] = useRemoveMenuMutation();
  const { refetch } = useGetAllMenuQuery();

  const handleOpen = (id) => {
    const menuDataItem = items.find((value) => value._id === id);
    setMenuData(menuDataItem);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const deleteMenu = async (_id) => {
    const removed = await removeMenu({ _id });
    refetch();
    // Add logic to handle the result of the removeClass mutation
    toast.success(`🦄 Menu removed successfully!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Card sx={{ width: "80%" }}>
      <Scrollbar>
        <Box sx={{ minWidth: 800, width: "50%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ textAlign: "center", width: "30%" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((menuData) => {
                const isSelected = selected.includes(menuData._id);

                console.log("====================================");
                console.log("Course class: ", menuData);
                console.log("====================================");
                return (
                  <TableRow hover key={menuData._id} selected={isSelected}>
                    <TableCell>{menuData.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        sx={{
                          backgroundColor: "red",
                          color: "#fff",
                          padding: "0.3rem 1rem 0.3rem 1rem",
                        }}
                        onClick={() => deleteMenu(menuData._id)}
                        disabled={isLoading}
                      >
                        delete
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(menuData._id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Modals
          Form={() => <AddMenuForm prefillData={menuData} editBtnTitle={"Edit Menu"} />}
          title={"Edit Menu"}
          open={open}
          handleClose={handleClose}
        />
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

AddDownloadTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
