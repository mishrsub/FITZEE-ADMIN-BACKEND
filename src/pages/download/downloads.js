import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import Modals from "src/components/Modal";
import AddMenuForm from "src/components/download/AddMenuForm";
import { AddDownloadTable } from "src/sections/download/download-table";
import { useGetAllMenuQuery } from "src/redux/api/downloadApi";

const useMenuData = (page, rowsPerPage, testData) => {
  return useMemo(() => {
    // Use testimonialData instead of the hardcoded 'data' array
    return applyPagination(testData, page, rowsPerPage);
  }, [page, rowsPerPage, testData]);
};

const useMenuId = (data) => {
  // console.log("Customers",data);
  return useMemo(() => {
    return data.map((data) => data._id);
  }, [data]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const { data: menuDt } = useGetAllMenuQuery();

  console.log("====================================");
  console.log("My Courses: ", menuDt);
  console.log("====================================");

  const course = menuDt?.menus || [];

  const menuData = useMenuData(page, rowsPerPage, course);
  const menuId = useMenuId(menuData);
  const upcomingAdmission = useSelection(menuId);

  console.log("This is Menu DATA: ", menuData);

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
        <title>Add Menu | Fitjee</title>
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
                <Typography variant="h4">Add Downloads Menu</Typography>
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
                  Add Menu
                </Button>
                <Modals
                  Form={AddMenuForm}
                  title={"Add Menu"}
                  open={open}
                  handleClose={handleClose}
                />
              </div>
            </Stack>
            <AddDownloadTable
              count={menuData.length}
              items={menuData}
              onDeselectAll={upcomingAdmission.handleDeselectAll}
              onDeselectOne={upcomingAdmission.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={upcomingAdmission.handleSelectAll}
              onSelectOne={upcomingAdmission.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={upcomingAdmission.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
