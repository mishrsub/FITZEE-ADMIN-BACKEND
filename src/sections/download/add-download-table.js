import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  MenuItem,
  Avatar,
  Box,
  Button,
  Card,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useEffect, useState } from "react";
import AddUploadForm from "src/components/download/AddUploadForm";
import Modals from "src/components/Modal";
import { useGetAllMenuQuery } from "src/redux/api/downloadApi";

export const AddDownloadTable = (props) => {
  console.log("PROPS DATA:  ------->", props);
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
  const [selectMenu, setSelectedMenu] = useState("Select Menus");
  const { isLoading, error, data } = useGetAllMenuQuery();
  const enable = true; // Set your condition for enabling or disabling

  console.log("selected item data: ", data);

  const handleChange = (event) => {
    setSelectedMenu(event.target.value);
  };

  console.log("====================================");
  console.log("Selected program: ", selectMenu);
  console.log("====================================");

  useEffect(() => {
    console.log("SELECTED PROGRAM: ", selectMenu);
  }, [selectMenu]);

  const menuWithSubmenu = data?.menus.find((item) => item.subMenus?.length > 0);

  const handleOpen = (id) => {
    const classDataItem = items.find((value) => value._id.toString() === id.toString());
    setMenuData(classDataItem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ width: "80%" }}>
      <Scrollbar>
        <Box sx={{ minWidth: 800, width: "50%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Menu</TableCell>
                <TableCell>SubMenu</TableCell>
                <TableCell sx={{ textAlign: "center", width: "30%" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((menuData) => {
                const isSelected = selected.includes(menuData._id);

                console.log("This is menu data");
                console.log(menuData.subMenus);

                return (
                  <TableRow hover key={menuData._id} selected={isSelected}>
                    <TableCell>{menuData.title}</TableCell>
                    <TableCell>
                      {menuWithSubmenu ? (
                        <>
                          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                          <Select
                            defaultValue={selectMenu}
                            placeholder="Enter Car Brand"
                            sx={{
                              width: 200,
                              height: 50,
                            }}
                            onChange={handleChange}
                          >
                            <MenuItem value={selectMenu}>select Menu</MenuItem>
                            {menuData.subMenus.length > 0 &&
                              menuData.subMenus.map((menu) => (
                                <MenuItem key={menu._id} value={menu.title}>
                                  {menu.title}
                                </MenuItem>
                              ))}
                          </Select>
                        </>
                      ) : (
                        <p>No submenus avialable</p>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        sx={{ border: "0.5px solid black", padding: "0.3rem 1rem 0.3rem 1rem" }}
                      >
                        {enable ? "Enable" : "Disable"}
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
          Form={() => (
            <AddUploadForm
              prefillData={menuData}
              editBtnTitle={"Edit Menu"}
              menuTitle={menuData.title}
              selectMenu={selectMenu}
            />
          )}
          title={"Edit Menu Detail"}
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
