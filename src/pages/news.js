import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import Modals from "src/components/Modal";
import Form from "src/components/news/Form";
import CircularProgress from "@mui/material/CircularProgress";
import { NewsTable } from "src/sections/news/news-table";
import { useGetNewsQuery } from "src/redux/api/newsApi";

const now = new Date();

const useTestimonial = (page, rowsPerPage, newsData,searchTerm) => {
  console.log('====================================');
  console.log(searchTerm);
  console.log('====================================');

  return useMemo(() => {
    let filteredNews = newsData;

    // If a search term is provided, filter testimonials based on the search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      filteredNews = newsData.filter(
        (news) =>
          news.author.toLowerCase().includes(lowerCaseSearchTerm) ||
          news.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          news.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Apply pagination to the filtered testimonial data
    return applyPagination(filteredNews, page, rowsPerPage);
  }, [page, rowsPerPage, newsData, searchTerm]);
};

const useCustomerIds = (customers) => {
  console.log("Customers", customers);
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

  const { data: testimonialResponse, isLoading, isError } = useGetNewsQuery();

  const newsData = testimonialResponse?.news || [];

  const news = useTestimonial(page, rowsPerPage, newsData,searchTerm);
  const customersIds = useCustomerIds(news);
  const newsSelection = useSelection(customersIds);

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
                <Typography variant="h4">News</Typography>
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
                  Add News
                </Button>
                <Modals
                  Form={Form}
                  title={"Add News"}
                  open={open}
                  handleClose={handleClose}
                />
              </div>
            </Stack>
            <CustomersSearch onSearch={handleSearch} searchTitle="Search News"/>
            <NewsTable
              count={news.length}
              items={news}
              onDeselectAll={newsSelection.handleDeselectAll}
              onDeselectOne={newsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={newsSelection.handleSelectAll}
              onSelectOne={newsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={newsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
