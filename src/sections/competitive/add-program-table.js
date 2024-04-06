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
import AddProgramForm from "src/components/competitive/AddProgramForm";
import Modals from "src/components/Modal";
import { useGetCompClassQuery } from "src/redux/api/compCourseApi";
import { Bounce, toast } from "react-toastify";


export const AddProgramTable = (props) => {
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
  const [classData, setClassData] = useState({});
  const [selectedProgram, setSelectedProgram] = useState("Select Program");
  const { isLoading, error, data,refetch } = useGetCompClassQuery();
  const enable = true; // Set your condition for enabling or disabling

  console.log("selected item data: ", data);

  const handleChange = (event) => {
    refetch();
    setSelectedProgram(event.target.value);
  };

  const classWithPrograms = data?.class.find((classItem) => classItem.programs.length > 0);

  const handleOpen = (id) => {
    const classDataItem = items.find((value) => value._id === id);
   
    if (classDataItem.programs.length <= 0) {
      toast.warn(`🦄 No program found!`, {
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
    } else {
      // If there are programs, set the classData and open the modal
      if(selectedProgram === "Select Program") {
         return toast.warn(`🦄Choose any program!`, {
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

      setClassData(classDataItem);
      setOpen(true);
    }
    
  };
  const handleClose = () => setOpen(false);

  return (
    <>
    <Card sx={{ width: "80%" }}>
      <Scrollbar>
        <Box sx={{ minWidth: 800, width: "50%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Program</TableCell>
                <TableCell sx={{ textAlign: "center", width: "30%" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((courseClass) => {
                const isSelected = selected.includes(courseClass._id);

                return (
                  <TableRow hover key={courseClass._id} selected={isSelected}>
                    <TableCell>Class {courseClass.name}</TableCell>
                    <TableCell>
                      {classWithPrograms ? (
                        <>
                          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                          <Select
                            defaultValue={selectedProgram}
                            placeholder="Enter Car Brand"
                            sx={{
                              width: 200,
                              height: 50,
                            }}
                            onChange={handleChange}
                          >
                             <MenuItem value={selectedProgram}>
                               Select Program
                              </MenuItem>
                            {courseClass.programs.map((program) => (
                              <MenuItem key={program._id} value={program.heading}>
                                {program.heading}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      ) : (
                        <p>No programs available for this class</p>
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
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(courseClass._id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Modals
          Form={() => (
            <AddProgramForm
              prefillData={classData}
              editBtnTitle={"Edit Program"}
              classData={classData.name}
              selectedProgram={selectedProgram}
            />
          )}
          title={"Edit Program Category"}
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
    </>
  );
};

AddProgramTable.propTypes = {
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
