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
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteContactMutation } from "src/redux/api/contactApi";
import { Bounce, toast } from "react-toastify";

export const ContactTable = (props) => {
 
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

    const [deleteContact] = useDeleteContactMutation();
    const deleteContactData = async(id) =>{
      try {
        const {data,error} = await deleteContact(id);
        // console.log("DELETED RESULT:  ",result);

        if(data.status === 200) {
          toast.success(`🦄 ${data.message}`, {
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

        if(data.status === 400) {
          toast.success(`🦄 ${data.message}`, {
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
        console.log(error);
      }
    }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((contact) => {
                console.log("RESULT DATA: ", contact);
                const isSelected = selected.includes(contact._id);
                return (
                  <TableRow hover key={contact._id} selected={isSelected}>
                    <TableCell sx={{fontWeight:"600"}}>{contact.type.toUpperCase()}</TableCell>
                    <TableCell sx={{textTransform:"capitalize"}}>{contact.name}</TableCell>
                    <TableCell>{contact.mobile}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.message}</TableCell>
                    <TableCell>
                      <Button 
                      >
                         <DeleteIcon sx={{color:"red",}} onClick={() => deleteContactData(contact._id)}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        {/* <Modals
          Form={() => (
            <Form
              prefillData={resultData}
              editBtnTitle={"Edit Result"}
            />
          )}
          title={"Edit Result"}
          open={open}
          handleClose={handleClose}
        /> */}
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

ContactTable.propTypes = {
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
