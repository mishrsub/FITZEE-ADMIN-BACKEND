import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useState } from "react";
import Modals from "src/components/Modal";
import Form from "src/components/testimonial/Form";
import { truncateText } from "src/utils/wordTruncate";

export const TestimonialTable = (props) => {
  console.log("PROPS DATA:  ------->", props);
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

    const [enable, setEnable] = useState(false);
    const [open, setOpen] = useState(false);
    const [testimonialData, setTestimonialData] = useState({});

    const handleOpen = (id) => {
      const testDataItem = items.find((value) => value._id === id);
      setTestimonialData(testDataItem);
      setOpen(true);
    };
    const handleClose = () => setOpen(false);


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                {/* <TableCell>Name</TableCell> */}
                <TableCell>Program</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((testimonial) => {
                console.log("TESTETETSTET", testimonial);
                const isSelected = selected.includes(testimonial._id);
                return (
                  <TableRow hover key={testimonial._id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={`http://35.154.95.255:8000/uploads/${testimonial.image}`}
                          sx={{ width: 70, height: 70, fontSize: 30 }}
                        >
                          {getInitials(testimonial.name)}
                        </Avatar>
                        <Typography variant="subtitle2">{testimonial.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{testimonial.program}</TableCell>
                    <TableCell>{truncateText(testimonial.description,17)}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ border: "0.5px solid black", padding: "0.3rem 1rem 0.3rem 1rem" }}
                      >
                        {enable ? "Enable" : "Disable"}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ cursor:"pointer" }}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(testimonial._id)}/>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Modals
          Form={() => (
            <Form
              prefillData={testimonialData}
              editBtnTitle={"Edit Testimonial"}
            />
          )}
          title={"Edit Testimonial"}
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

TestimonialTable.propTypes = {
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
