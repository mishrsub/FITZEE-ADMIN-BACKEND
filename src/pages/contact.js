import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { ContactTable } from "src/sections/contact/contact-table";
import { useGetContactsQuery } from "src/redux/api/contactApi";
import { CustomersSearch } from "src/sections/customer/customers-search";

const now = new Date();

const useResults = (page, rowsPerPage, resultData,searchTerm) => {

  return useMemo(() => {
    let filteredContact = resultData;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
      filteredContact = resultData.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          contact.mobile.toLowerCase().includes(lowerCaseSearchTerm) ||
          contact.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return applyPagination(filteredContact, page, rowsPerPage);
  }, [page, rowsPerPage, resultData,searchTerm]);
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
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const { data: contactResponse, isLoading, isError } = useGetContactsQuery();

  console.log('====================================');
  console.log("Contact response: ",contactResponse);
  console.log('====================================');
  const resultData = contactResponse?.contact || [];

  const contact = useResults(page, rowsPerPage, resultData,searchTerm);
  const contactIds = useCustomerIds(contact);
  const contactSelection = useSelection(contactIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Fitzee | Contact</title>
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
                <Typography variant="h4">Contacts</Typography>
              </Stack>
            </Stack>
            <CustomersSearch 
            onSearch={handleSearch} 
            searchTitle="Search contact"
            />
            <ContactTable
              count={contactResponse.length}
              items={contact}
              onDeselectAll={contactSelection.handleDeselectAll}
              onDeselectOne={contactSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={contactSelection.handleSelectAll}
              onSelectOne={contactSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={contactSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
