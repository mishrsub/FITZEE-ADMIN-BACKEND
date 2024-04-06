import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import Modals from 'src/components/Modal';
import { useGetCoursesQuery } from 'src/redux/api/courseApi';
import AddProgramForm from 'src/components/competitive/AddProgramForm';
import { AddProgramTable } from 'src/sections/competitive/add-program-table';
import { useGetCompClassQuery } from 'src/redux/api/compCourseApi';
const now = new Date();


const useClassData = (page, rowsPerPage, testData) => {
  return useMemo(
    () => {
      // Use testimonialData instead of the hardcoded 'data' array
      return applyPagination(testData, page, rowsPerPage);
    },
    [page, rowsPerPage, testData]
  );
};


const useClassId = (data) => {
  console.log("Customers",data);
  return useMemo(
    () => {
      return data.map((data) => data._id);
    },
    [data]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  
  const { data: courses } = useGetCompClassQuery();

  console.log('====================================');
  console.log(courses);
  console.log('====================================');

  const course = courses?.class || [];

  const classData = useClassData(page, rowsPerPage, course);
  const classId = useClassId(classData);
  const upcomingAdmission = useSelection(classId);

  // console.log(testimonialResponse);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Add Program | Fitjee
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Add Program Category
                </Typography>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpen}
                >
                  Add Program Category
                </Button>
               <Modals 
               Form={AddProgramForm} 
               title={"Add Program"} 
               open={open} 
               handleClose={handleClose} 
               />    
              </div>
            </Stack>
            <AddProgramTable
              count={classData.length}
              items={classData}
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
