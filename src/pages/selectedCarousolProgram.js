import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import  {TestimonialTable}  from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";
import Modals from "src/components/Modal";
import { useGetTestimonialQuery } from "src/redux/api/testimonialApi";
import Form from "src/components/testimonial/Form";
import CircularProgress from "@mui/material/CircularProgress";

const now = new Date();

const data = [
  {
    id: "5e887ac47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    program: "carson.darrin@devias.io",
    name: "Carson Darrin",
    description: "304-428-3097",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    program: "fran.perez@devias.io",
    name: "Fran Perez",
    description: "712-351-5711",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    program: "jie.yan.song@devias.io",
    name: "Jie Yan Song",
    description: "770-635-2682",
  },
  {
    id: "5e86809283e28b96d2d38537",
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    program: "anika.visser@devias.io",
    name: "Admin",
    description: "908-691-3242",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    program: "miron.vitold@devias.io",
    name: "Miron Vitold",
    description: "972-333-4106",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    program: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    description: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    program: "omar.darobe@devias.io",
    name: "Omar Darobe",
    description: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    program: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    description: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    program: "iulia.albu@devias.io",
    name: "Iulia Albu",
    description: "313-812-8947",
  },
];

const useTestimonial = (page, rowsPerPage, testimonialData) => {
  return useMemo(() => {
    // Use testimonialData instead of the hardcoded 'data' array
    return applyPagination(testimonialData, page, rowsPerPage);
  }, [page, rowsPerPage, testimonialData]);
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

  const { data: testimonialResponse, isLoading, isError } = useGetTestimonialQuery();

  const testimonialData = testimonialResponse?.testimonial || [];

  const testimonial = useTestimonial(page, rowsPerPage, testimonialData);
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
            <CustomersSearch />
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
