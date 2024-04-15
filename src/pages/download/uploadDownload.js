import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import Modals from "src/components/Modal";
import { useGetAllMenuQuery } from "src/redux/api/downloadApi";
import AddUploadForm from "src/components/download/AddUploadForm";
import { AddDownloadTable } from "src/sections/download/add-download-table";
const now = new Date();

const useMenuData = (page, rowsPerPage, testData) => {
  return useMemo(() => {
    // Use testimonialData instead of the hardcoded 'data' array
    return applyPagination(testData, page, rowsPerPage);
  }, [page, rowsPerPage, testData]);
};

const useMenuId = (data) => {
  console.log("Customers", data);
  return useMemo(() => {
    return data.map((data) => data._id);
  }, [data]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const { data: menuData } = useGetAllMenuQuery();

  const course = menuData?.menus || [];

  const allData = useMenuData(page, rowsPerPage, course);
  const menuId = useMenuId(allData);
  const menuDownload = useSelection(menuId);

  // console.log(testimonialResponse);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Add Download-menu | Fitjee</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Add Download SubMenu</Typography>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleOpen}
                >
                  Add SubMenu
                </Button>
                <Modals
                  Form={AddUploadForm}
                  title={"Add Sub-menu"}
                  open={open}
                  handleClose={handleClose}
                />
              </div>
            </Stack>
            <AddDownloadTable
              count={allData.length}
              items={allData}
              onDeselectAll={menuDownload.handleDeselectAll}
              onDeselectOne={menuDownload.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={menuDownload.handleSelectAll}
              onSelectOne={menuDownload.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={menuDownload.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
