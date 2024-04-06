import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TestimonialTable } from "src/sections/customer/customers-table";
import { applyPagination } from "src/utils/apply-pagination";
import { useGetTestimonialQuery } from "src/redux/api/testimonialApi";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const now = new Date();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
  const [searchTerm, setSearchTerm] = useState("");

  const { data: testimonialResponse, isLoading, isError } = useGetTestimonialQuery();

  const testimonialData = testimonialResponse?.testimonial || [];

  const testimonial = useTestimonial(page, rowsPerPage, testimonialData, searchTerm);
  const customersIds = useCustomerIds(testimonial);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Stack 
            direction="row" 
            justifyContent="space-between" 
            spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">Reviews and Comments</Typography>
              </Stack>
            </Stack>

            <Box sx={{ minWidth: 800 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs 
                value={value} 
                onChange={handleChange} 
                aria-label="basic tabs example"
                >
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <TestimonialTable
                  count={testimonialResponse?.length}
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TestimonialTable
                  count={testimonialResponse?.length}
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
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item One
              </CustomTabPanel>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
