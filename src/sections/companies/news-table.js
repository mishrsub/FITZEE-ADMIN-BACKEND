import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
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
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useEffect, useState } from 'react';
import Modals from 'src/components/Modal';
import Form from 'src/components/recentNews/Form';
import { truncateText } from 'src/utils/wordTruncate';

export const RecentNewsTable = (props) => {
  console.log(props);
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const [enable,setEnable] = useState(false);
  const [open, setOpen] = useState(false);
  const [newsData, setNewsData] = useState({});

  const handleOpen = (id) => {
    const newsDataItem = items.find((value) => value._id === id);
    setNewsData(newsDataItem);
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
                <TableCell>
                  Thumbnail
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((exam) => {
                console.log("TESTETETSTET",exam);
                const isSelected = selected.includes(exam._id);

                return (
                  <TableRow
                    hover
                    key={exam._id}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={`http://35.154.95.255:8000/uploads/${exam.image}`}  sx={{ width: 70, height: 70, fontSize: 30 }}>
                          {getInitials(exam?.name)}
                        </Avatar>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      hello
                      {exam.title}
                    </TableCell>
                    <TableCell>
                      {truncateText(exam.description,17)}
                    </TableCell>
                    <TableCell>
                        <Button sx={{border:"0.5px solid black",padding: '0.3rem 1rem 0.3rem 1rem'}}>
                            { enable? "Enable" :"Disable"}
                        </Button>
                    </TableCell>
                    <TableCell sx={{cursor:"pointer"}}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(exam._id)}/>
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
              prefillData={newsData}
              editBtnTitle={"Edit Program"}
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

RecentNewsTable.propTypes = {
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
  selected: PropTypes.array
};
