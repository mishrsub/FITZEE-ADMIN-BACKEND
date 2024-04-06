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
import Form from "src/components/news/Form";
import { truncateText } from "src/utils/wordTruncate";

export const NewsTable = (props) => {
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
    const [newsData, setNewsData] = useState({});

    const handleOpen = (id) => {
      const testDataItem = items.find((value) => value._id === id);
      setNewsData(testDataItem);
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
                <TableCell>Author</TableCell>
                {/* <TableCell>Name</TableCell> */}
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((news) => {
                console.log("TESTETETSTET", news);
                const isSelected = selected.includes(news._id);
                return (
                  <TableRow hover key={news._id} selected={isSelected}>
                    <TableCell sx={{fontWeight:"700",textTransform:"uppercase"}}>{news.author}</TableCell>
                    <TableCell>{news.title}</TableCell>
                    <TableCell>{truncateText(news.description,17)}</TableCell>
                    <TableCell>
                      <Button
                        sx={{ border: "0.5px solid black", padding: "0.3rem 1rem 0.3rem 1rem" }}
                      >
                        {enable ? "Enable" : "Disable"}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ cursor:"pointer" }}>
                      <FontAwesomeIcon icon={faEdit} onClick={() => handleOpen(news._id)}/>
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
              editBtnTitle={"Edit News"}
            />
          )}
          title={"Edit News"}
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

NewsTable.propTypes = {
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
