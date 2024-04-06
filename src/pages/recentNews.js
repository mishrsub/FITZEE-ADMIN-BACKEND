import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { applyPagination } from 'src/utils/apply-pagination';
import Modals from 'src/components/Modal';
import Form from "src/components/recentNews/Form";
import { NewsSearch } from 'src/sections/companies/news-search';
import { RecentNewsTable } from 'src/sections/companies/news-table';
import { useGetNewsQuery } from 'src/redux/api/recentNewsApi';
import { CustomersSearch } from 'src/sections/customer/customers-search';
const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    program: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    description: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    program: 'fran.perez@devias.io',
    name: 'Fran Perez',
    description: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    program: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    description: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    program: 'anika.visser@devias.io',
    name: 'Anika Visser',
    description: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    program: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    description: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    program: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    description: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    program: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    description: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    program: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    description: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    program: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    description: '313-812-8947'
  },
];

const useTestimonial = (page, rowsPerPage, testimonialData,searchTerm) => {
  return useMemo(() => {
    let filteredTestimonials = testimonialData;

    console.log('====================================');
    console.log("FILTERED TESTIMONIAL: ",filteredTestimonials);
    console.log('====================================');

    // If a search term is provided, filter testimonials based on the search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filteredTestimonials = testimonialData.filter(
        (testimonial) =>
          testimonial.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          testimonial.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Apply pagination to the filtered testimonial data
    return applyPagination(filteredTestimonials, page, rowsPerPage);
  }, [page, rowsPerPage, testimonialData, searchTerm]);
};


const useCustomerIds = (data) => {
  console.log("data",data);
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

  const { data: newsResponse } = useGetNewsQuery();

  // Extract testimonial array from the response
  const newsData = newsResponse?.news || [];

  const news = useTestimonial(page, rowsPerPage, newsData,searchTerm);
  const newsId = useCustomerIds(news);
  const newsSelection = useSelection(newsId);

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
        Blogs | Fitjee
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
                  Blogs
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
                  Add Blog
                </Button>
                <Modals Form={Form} title={"Add Blog"} open={open} handleClose={handleClose} />
              </div>
            </Stack>
            <CustomersSearch onSearch={handleSearch} searchTitle="Search Blog"/>
            <RecentNewsTable
              count={data.length}
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
