import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { WorkshopTable } from "src/sections/workshops/workshop-table";
import { useGetWorkshopsQuery } from "src/redux/api/eventApi";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";

const now = new Date();

const useResults = (page, rowsPerPage, resultData, searchTerm) => {
  return useMemo(() => {
    let filteredResults = resultData;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      filteredResults = resultData.filter(
        (result) =>
          result.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          result.address.toLowerCase().includes(lowerCaseSearchTerm) ||
          result.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          result.catalog.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return applyPagination(filteredResults, page, rowsPerPage);
  }, [page, rowsPerPage, resultData, searchTerm]);
};

const useCustomerIds = (results) => {
  return useMemo(() => {
    return results.map((customer) => customer._id);
  }, [results]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const { data: workshopsResponse, isLoading,refetch } = useGetWorkshopsQuery();

  const resultData = workshopsResponse?.workshops || [];

  const workshop = useResults(page, rowsPerPage, resultData, searchTerm);
  const workshopIds = useCustomerIds(workshop);
  const workshopSelection = useSelection(workshopIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
    refetch();
  },[refetch]);

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
        <title>All Workshops | FITJEE</title>
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
                <Typography variant="h4">All Workshops</Typography>
              </Stack>
            </Stack>
            <CustomersSearch onSearch={handleSearch} searchTitle="Search workshop"/>
            <WorkshopTable
              count={workshopsResponse.length}
              items={workshop}
              onDeselectAll={workshopSelection.handleDeselectAll}
              onDeselectOne={workshopSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={workshopSelection.handleSelectAll}
              onSelectOne={workshopSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={workshopSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
