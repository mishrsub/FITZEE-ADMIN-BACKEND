import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Form from "src/components/upcomingTest/Form";
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
import {
  useDeleteUpcomingAdmissionMutation,
  useGetUpcomingAdmissionQuery,
} from "src/redux/api/upcomingAdmissionTestApi";

export const UpcomingAdmissionTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const [enable, setEnable] = useState(false);
  const [open, setOpen] = useState(false);
  const [examData, setExamData] = useState({});
  const { data } = useGetUpcomingAdmissionQuery();
  const [deleteUpcomingAdmission, { isError }] = useDeleteUpcomingAdmissionMutation();

  const handleOpen = (id) => {
    const testData = data.test.find((value) => value._id === id);
    setExamData(testData);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteTest = async (id) => {
    try {
      console.log(id);
      const response = await deleteUpcomingAdmission(id);

      setEnable;
      // Handle success or do something with the response
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name Of Exam</TableCell>
                <TableCell>Date Of Exam</TableCell>
                <TableCell>Eligible Class</TableCell>
                <TableCell>Url</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((upcomingTest, i, arr) => {
                const isSelected = selected.includes(upcomingTest._id);

                return (
                  <TableRow hover key={upcomingTest._id} selected={isSelected}>
                    <TableCell>{upcomingTest.examName}</TableCell>
                    <TableCell>{format(new Date(upcomingTest.examDate), "yyyy-MM-dd")}</TableCell>
                    <TableCell>
                      {upcomingTest.eligibleClass.map((val) => `${val.className} | `)}
                    </TableCell>
                    <TableCell>{upcomingTest.urlName}</TableCell>
                    <TableCell> 
                      <Button
                        onClick={() => deleteTest(upcomingTest._id)}
                        sx={{
                          border: "0.3px solid black",
                          padding: "0rem 0.5rem 0rem 0.5rem",
                          backgroundColor: "#fff",
                          color: upcomingTest.isDeleted ? "green" : "red",
                          transition: "color 0.3s ease", // Smooth transition effect
                          "&:hover": {
                            color: upcomingTest.isDeleted ? "green" : "red",
                            // Add more styles for the hover effect
                          },  
                        }}
                      >
                        {upcomingTest.isDeleted ? "Enable" : "Disable"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => handleOpen(upcomingTest._id)}
                        cursor={"pointer"}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Modals
          Form={() => <Form prefillData={examData} editBtnTitle={"Edit Test"} />}
          title={"Edit Upcoming Test"}
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

UpcomingAdmissionTable.propTypes = {
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
