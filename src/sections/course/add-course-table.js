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
import AddClassForm from "src/components/courses/AddClassForm";
import { useRemoveClassMutation } from "src/redux/api/courseApi";

export const AddCourseTable = (props) => {
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
  const [classData, setClassData] = useState({});
  const [disableButtons, setDisableButtons] = useState({});
  const [removeClass, { isLoading, isError, isSuccess }] = useRemoveClassMutation();

  console.log("====================================");
  console.log("This course class table", items);
  console.log("====================================");
  const handleOpen = (id) => {
    const classDataItem = items.find((value) => value._id === id);
    setClassData(classDataItem);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const deleteClass = async (_id) => {
    setDisableButtons((prev) => ({ ...prev, [_id]: !prev[_id] })); // Disable the clicked button

    const removedClass = await removeClass({ _id });
    // Add logic to handle the result of the removeClass mutation
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
              {items.map((courseClass) => {
                const isSelected = selected.includes(courseClass._id);

                console.log("====================================");
                console.log("Course class: ", courseClass);
                console.log("====================================");
                return (
                  <TableRow hover key={courseClass._id} selected={isSelected}>
                    <TableCell>Class {courseClass.name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        sx={{
                          backgroundColor:
                            disableButtons[courseClass._id] 
                              ? "green"
                              : "red",
                          color: "#fff",
                          padding: "0.3rem 1rem 0.3rem 1rem",
                        }}
                        onClick={() => deleteClass(courseClass._id)}
                        disabled={isLoading}
                      >
                        {disableButtons[courseClass._id] ? "Enable" : "Disable"}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(courseClass._id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Modals
          Form={() => <AddClassForm prefillData={classData} editBtnTitle={"Edit Class"} />}
          title={"Edit class"}
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

AddCourseTable.propTypes = {
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
