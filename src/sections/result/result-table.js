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
import Form from "src/components/result/Form";
import DeleteIcon from '@mui/icons-material/Delete';

export const ResultTable = (props) => {
  console.log("PROPS DATA:  ------->", props);
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

    const [enable, setEnable] = useState(false);
    const [open, setOpen] = useState(false);
    const [resultData, setResultData] = useState({});

    const handleOpen = (id) => {
      const testDataItem = items.find((value) => value._id === id);
      console.log('====================================');
      console.log("Test Data Item: ",testDataItem);
      console.log('====================================');
      setResultData(testDataItem);
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
                <TableCell>Program</TableCell>
                <TableCell>Program-Name</TableCell>
                <TableCell>Eligible-Class</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((result) => {
                console.log("RESULT DATA: ", result);
                const isSelected = selected.includes(result._id);
                return (
                  <TableRow hover key={result._id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar
                          src={`http://35.154.95.255:8000/uploads/${result.programImg}`}
                          sx={{ width: 70, height: 70, fontSize: 30 }}
                        >
                          {getInitials(result.name)}
                        </Avatar>
                        <Typography variant="subtitle2">{result.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{result.programName}</TableCell>
                    <TableCell>{result?.eligibleClass.map((val,i) => `${val.name} | `)}</TableCell>
                    <TableCell>{result?.subjectsCovered.map((val,i) => `${val.name} | `)}</TableCell>
                    <TableCell>{new Date(result.date).toLocaleDateString('en-US', options)}</TableCell>
                    <TableCell>
                      <Button 
                      >
                         <DeleteIcon sx={{color:"red",}}/>
                      </Button>
                    </TableCell>
                    <TableCell sx={{ cursor:"pointer" }}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(result._id)}/>
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
              prefillData={resultData}
              editBtnTitle={"Edit Result"}
            />
          )}
          title={"Edit Result"}
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

ResultTable.propTypes = {
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
