import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ResultTable } from "src/sections/result/result-table";
import { useGetResultsQuery } from "src/redux/api/result";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import { useSelection } from "src/hooks/use-selection";

const now = new Date();

const useResults = (page, rowsPerPage, resultData, searchTerm) => {
  return useMemo(() => {
    let filteredResults = resultData;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredResults = filteredResults.filter(
        (result) =>
          result.programName.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return applyPagination(filteredResults, page, rowsPerPage);
  }, [page, rowsPerPage, resultData, searchTerm]);
};

const useCustomerIds = (results) => {
  console.log("Customers", results);
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

  const { data: resultResponse, isLoading,refetch } = useGetResultsQuery();

  const resultData = resultResponse?.result || [];

  const result = useResults(page, rowsPerPage, resultData, searchTerm);
  const resultIds = useCustomerIds(result);
  const resultSelection = useSelection(resultIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  useEffect(() => {
      refetch();
  },[refetch])

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
        <title>Fitzee | Result</title>
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
                <Typography variant="h4">Results</Typography>
              </Stack>
            </Stack>
            <CustomersSearch onSearch={handleSearch} searchTitle="Search Program"/>
            <ResultTable
              count={resultResponse.length}
              items={result}
              onDeselectAll={resultSelection.handleDeselectAll}
              onDeselectOne={resultSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={resultSelection.handleSelectAll}
              onSelectOne={resultSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={resultSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
