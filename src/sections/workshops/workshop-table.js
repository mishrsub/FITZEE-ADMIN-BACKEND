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
import Form from "src/components/workshops/Form";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationModal from "src/components/ConfirmationModal";
import { useDeleteWorkshopMutation } from "src/redux/api/eventApi";

export const WorkshopTable = (props) => {
  console.log("PROPS DATA:  ------->", props);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
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
  const [resultData, setResultData] = useState({});
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteWorkshop] = useDeleteWorkshopMutation();
  
  const handleOpen = (id) => {
    const testDataItem = items.find((value) => value._id === id);
    setResultData(testDataItem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteOpen = (id) => {
    setDeleteItemId(id);
  };

  const handleDeleteClose = () => {
    setDeleteItemId(null);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteWorkshop(deleteItemId);
    // Handle the result or response as needed
    console.log(result);

      // After deletion is successful, close the delete confirmation modal
      handleDeleteClose();
    } catch (error) {
       // Handle errors
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
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Timing</TableCell>
                <TableCell>Catalog</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((workshop) => {
                console.log("RESULT DATA: ", workshop);
                const isSelected = selected.includes(workshop._id);
                return (
                  <TableRow hover key={workshop._id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={`http://35.154.95.255:8000/uploads/${workshop.image}`}
                          sx={{ width: 70, height: 70, fontSize: 30 }}
                        >
                          {getInitials(workshop.name)}
                        </Avatar>
                        <Typography variant="subtitle2">{workshop.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{workshop.title}</TableCell>
                    <TableCell>{workshop.description}</TableCell>
                    <TableCell>{workshop.address}</TableCell>
                    <TableCell>
                      {new Date(workshop.timing).toLocaleDateString("en-US", options)}
                    </TableCell>
                    <TableCell>{workshop.catalog}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleDeleteOpen(workshop._id)}>
                        <DeleteIcon sx={{ color: "red" }} />
                      </Button>
                    </TableCell>
                    <TableCell sx={{ cursor: "pointer" }}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(workshop._id)} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {/* Edit workshop modal */}
        <Modals
          Form={() => <Form prefillData={resultData} editBtnTitle={"Edit Workshop"} />}
          title={"Edit Workshop"}
          open={open}
          handleClose={handleClose}
        />
        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          open={!!deleteItemId}
          onClose={handleDeleteClose}
          onDelete={handleDelete}
          itemToDelete={deleteItemId}
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

WorkshopTable.propTypes = {
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
