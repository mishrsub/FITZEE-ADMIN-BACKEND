import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Container,
  Paper,
  TextField,
  Grid,
  Typography,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
} from "@mui/material";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { applyPagination } from "src/utils/apply-pagination";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addResult, addResultYear } from "src/redux/apiReuse/resultFun";
import { useGetResultsQuery } from "src/redux/api/result";

const useClassData = (page, rowsPerPage, testData) => {
  return React.useMemo(() => {
    return applyPagination(testData, page, rowsPerPage);
  }, [page, rowsPerPage, testData]);
};

const Page = () => {
  const {
    handleSubmit: handleSubmitForm1,
    register: registerForm1,
    setValue: setValueForm1,
    reset: resetForm1,
  } = useForm();

  const [selectedProgramId, setSelectedProgramId] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState("");
  const { handleSubmit: handleSubmitForm2, register: registerForm2, reset: resetForm2  } = useForm();
  const { data: resultResponse, isLoading, isError } = useGetResultsQuery();

  console.log("====================================");
  console.log("RESULT RESPONSE: ", resultResponse);
  console.log("====================================");

  const YearSelect = ({ selectedYear, onChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, index) => 2020 + index);
  
    return (
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Year</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedYear}
        label="Year"
        onChange={onChange}
        // {...registerForm2("passingYear")}
      >
        {years.map((val) => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    );
  };
  

  const handleSelectChange = (event) => {
    setSelectedProgramId(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const onSubmitForm1 = async (value) => {
    try {
      const formData = new FormData();
      formData.append("programName", value.programName);
      formData.append("eligibleClass", value.eligibleClass);
      formData.append("subjectsCovered", value.subjectsCovered);
      formData.append("image", value.image[0]);
      formData.append("date", value.date);

      const result = await addResult(formData);

      if (result.status === 201) {
        resetForm1();
        toast.success(`🦄 ${result.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.warn(`🦄 ${error.message}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const onSubmitForm2 = async (value) => {
    try {
      setSelectedYear("")
      setSelectedProgramId("")
      console.log('====================================');
      console.log("Value: ",value);
      console.log('====================================');
      const formData = new FormData();
      formData.append("_id", selectedProgramId);
      formData.append("passingYear", selectedYear);

      // Iterate through selected files using forEach [upload multiple images]
      const selectedFiles = value.image;

      // Iterate through selected files
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        formData.append("image", file);
      }

      const result = await addResultYear(formData);

      if (result.status === 201) {
          resetForm2();
        toast.success(`🦄 ${result.message}!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.warn(`🦄 ${error.message}!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDateChange = (date) => {
    setValueForm1("date", date, { shouldValidate: true });
  };

  return (
    <>
      <Head>
        <title>Add Program | Fitjee</title>
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
            <form onSubmit={handleSubmitForm1(onSubmitForm1)}>
              <Container
                component="main"
                maxWidth="md"
                sx={{ mb: 4, border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h5" align="left" marginBottom={5}>
                    Add Result
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          label="Program name"
                          fullWidth
                          variant="standard"
                          {...registerForm1("programName")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          label="Eligible Class"
                          placeholder="V,VI,VII,VIII,IX,X,XI,XII,XIII"
                          fullWidth
                          variant="standard"
                          {...registerForm1("eligibleClass")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          label="Subject Covered"
                          fullWidth
                          placeholder="MATH,ENGLISH"
                          variant="standard"
                          {...registerForm1("subjectsCovered")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <DatePicker
                          fullWidth
                          label="Date"
                          {...registerForm1("date")}
                          onChange={handleDateChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ textAlign: "left", marginTop: 2 }}>
                          Upload Program
                        </FormLabel>
                        <input type="file" {...registerForm1("image")} />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button type="submit" variant="contained" sx={{ mt: 1, ml: 1 }} fullWidth>
                          Add Result
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Container>
            </form>

            <form onSubmit={handleSubmitForm2(onSubmitForm2)}>
              <Container
                component="main"
                maxWidth="md"
                sx={{ mb: 4, border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h5" align="left" marginBottom={5}>
                    Add Result Detail
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Choose result program</InputLabel>
                          <Select
                            {...registerForm2("_id")}
                            value={selectedProgramId}
                            onChange={(e) => handleSelectChange(e)}
                          >
                            {resultResponse?.result.map((program) => (
                              <MenuItem key={program._id} value={program._id}>
                                {program.programName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                      <YearSelect selectedYear={selectedYear} onChange={handleYearChange} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ textAlign: "left", marginTop: 2 }}>
                          Upload Profile{" "}
                        </FormLabel>
                        <input type="file" {...registerForm2("image")} multiple />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button type="submit" variant="contained" sx={{ mt: 1, ml: 1 }} fullWidth>
                          Add Result Detail
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Container>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
