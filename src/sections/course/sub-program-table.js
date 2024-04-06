import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  MenuItem,
  FormControl,
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
  InputLabel,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useEffect, useState } from "react";
import { useGetCoursesQuery } from "src/redux/api/courseApi";
import Modals from "src/components/Modal";
import AddSubProgramForm from "src/components/courses/AddSubProgramForm";

export const SubProgramTable = (props) => {
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
  const [selectedSubPrograms, setSelectedSubPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("Select Program");
  const [selectedSubProgram, setSelectedSubProgram] = useState("Select Sub Program");
  const { isLoading, error, data } = useGetCoursesQuery();
  const enable = true; // Set your condition for enabling or disabling

  const classWithPrograms = data?.class.find((classItem) => classItem.programs.length > 0);

  const handleOpen = (id) => {
    const classDataItem = items.find((value) => value._id === id);
    setClassData(classDataItem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event, classId) => {
    const selectedClass = data.class.find(
      (classItem) => classItem._id.toString() === classId.toString()
    );
    setSelectedProgram("Select Program"); // Reset selected program when class changes
    setSelectedSubPrograms([]); // Reset selected subprograms when class changes

    if (selectedClass) {
      const selectedProgramValue = event.target.value;
      setSelectedProgram(selectedProgramValue);
      handleProgramChange(selectedClass.programs, selectedProgramValue);
    }
  };

  const handleProgramChange = (programs, selectedProgramValue) => {
    const selectedProgramData = programs.find((program) => program.name === selectedProgramValue);
    setSelectedSubPrograms(selectedProgramData ? selectedProgramData.subprograms : []);
  };

  return (
    <Card sx={{ width: "98%", marginRight: "2%" }}>
      <Scrollbar>
        <Box sx={{ minWidth: 800, width: "95%" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>Program</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Sub-Program</TableCell>
                <TableCell sx={{ textAlign: "center", width: "30%" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center", width: "10%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((courseClass) => {
                const isSelected = selected.includes(courseClass._id);

                return (
                  <TableRow hover key={courseClass._id} selected={isSelected}>
                    <TableCell sx={{ fontWeight: "bold" }}>{courseClass.name}</TableCell>
                    <TableCell>
                      {classWithPrograms ? (
                        <>
                          {/* <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select program</InputLabel> */}
                          <Select
                            defaultValue={selectedProgram}
                            placeholder="Enter Car Brand"
                            sx={{
                              width: 300,
                              height: 50,
                            }}
                            onChange={(event) => handleChange(event, courseClass._id)}
                          >
                            <MenuItem value={selectedProgram}>Select Program</MenuItem>
                            {courseClass.programs.map((program) => (
                              <MenuItem key={program._id} value={program.name}>
                                {program.name}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* </FormControl> */}
                        </>
                      ) : (
                        <p>No programs available for this class</p>
                      )}
                    </TableCell>
                    <TableCell>
                      {classWithPrograms ? (
                        <>
                            <Select
                              defaultValue={selectedSubProgram}
                              placeholder="Enter Car Brand"
                              sx={{
                                width: 300,
                                height: 50,
                              }}
                              onChange={(event) => setSelectedSubProgram(event.target.value)}
                            >
                              <MenuItem value={selectedSubProgram}>Select Sub Program</MenuItem>
                              {selectedProgram?.length > 0 &&
                                selectedSubPrograms.map((subprogram) => (
                                  <MenuItem value={subprogram.name} key={subprogram._id}>
                                    {subprogram.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          {/* </FormControl> */}
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
            <AddSubProgramForm
              prefillData={classData}
              editBtnTitle={"Edit Program"}
              classData={classData.name}
              selectedProgram={selectedProgram}
              subprogram={selectedSubProgram}
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
  );
};

SubProgramTable.propTypes = {
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



  // useEffect(() => {
  //   refetch(); // Refetch data when the component mounts
  // }, [refetch]);