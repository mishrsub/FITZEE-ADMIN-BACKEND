import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import Modals from 'src/components/Modal';
import Form from "src/components/upcomingTest/Form";
import { useGetUpcomingAdmissionQuery } from 'src/redux/api/upcomingAdmissionTestApi';
import { UpcomingAdmissionTable } from 'src/sections/account/upcoming-admission-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
const now = new Date();

const useUpcomingTest = (page, rowsPerPage, testData,searchTerm) => {
  return useMemo(() => {
    let filteredTest = testData;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredTest = testData.filter(
        (testimonial) =>
          testimonial.examName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return applyPagination(filteredTest, page, rowsPerPage);
  }, [page, rowsPerPage, testData,searchTerm]);
};


const useUpcomingAdmissionIds = (data) => {
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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  const { data: upcomingTestResponse } = useGetUpcomingAdmissionQuery();

  const upcomingTest = upcomingTestResponse?.test || [];

  const test = useUpcomingTest(page, rowsPerPage, upcomingTest,searchTerm);
  const cusIds = useUpcomingAdmissionIds(test);
  const upcomingAdmission = useSelection(cusIds);

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
          Upcoming Test | Fitjee
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
                  Upcoming Admission Test
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
                  Add Test
                </Button>
               <Modals Form={Form} title={"Add Upcoming Test"} open={open} handleClose={handleClose} />    
              </div>
            </Stack>
            <CustomersSearch onSearch={handleSearch} searchTitle="Search Exam"/>
            <UpcomingAdmissionTable
              count={upcomingTest.length}
              items={test}
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
