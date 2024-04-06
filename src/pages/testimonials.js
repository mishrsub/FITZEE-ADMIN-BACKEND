import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import {  TestimonialTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import Modals from "src/components/Modal";
import { useGetTestimonialQuery } from "src/redux/api/testimonialApi";
import Form from "src/components/testimonial/Form";
import CircularProgress from "@mui/material/CircularProgress";

const now = new Date();

// Update useTestimonial hook in Page.js
const useTestimonial = (page, rowsPerPage, testimonialData, searchTerm) => {
  return useMemo(() => {
    let filteredTestimonials = testimonialData;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredTestimonials = testimonialData.filter(
        (testimonial) =>
          testimonial.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          testimonial.program.toLowerCase().includes(lowerCaseSearchTerm) ||
          testimonial.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return applyPagination(filteredTestimonials, page, rowsPerPage);
  }, [page, rowsPerPage, testimonialData, searchTerm]);
};


const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer._id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const { data: testimonialResponse, isLoading, isError } = useGetTestimonialQuery();

  const testimonialData = testimonialResponse?.testimonial || [];

  const testimonial = useTestimonial(page, rowsPerPage, testimonialData,searchTerm);
  const customersIds = useCustomerIds(testimonial);
  const customersSelection = useSelection(customersIds);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Customers | Devias Kit</title>
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
                <Typography variant="h4">Testimonials</Typography>
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
                  Add Testimonial
                </Button>
                <Modals
                  Form={Form}
                  title={"Add Testimonial"}
                  open={open}
                  handleClose={handleClose}
                />
              </div>
            </Stack>
            <CustomersSearch onSearch={handleSearch} searchTitle="Search Testimonials"/>
            <TestimonialTable
              count={testimonialResponse.length}
              items={testimonial}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
