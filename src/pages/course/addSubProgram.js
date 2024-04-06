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
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { useGetCoursesQuery } from "src/redux/api/courseApi";
import {  addSubProgramByAxios } from "src/redux/apiReuse/courseFun";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { applyPagination } from 'src/utils/apply-pagination';
import { useSelection } from 'src/hooks/use-selection';
import { SubProgramTable } from "src/sections/course/sub-program-table";


const useClassData = (page, rowsPerPage, testData) => {
  return React.useMemo(
    () => {
      // Use testimonialData instead of the hardcoded 'data' array
      return applyPagination(testData, page, rowsPerPage);
    },
    [page, rowsPerPage, testData]
  );
};


const useClassId = (data) => {
  console.log("Customers",data);
  return React.useMemo(
    () => {
      return data.map((data) => data._id);
    },
    [data]
  );
};


const Page = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedClass, setSelectedClass] = React.useState({existedClass:"",existedProgram:""});
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const { handleSubmit: handleSubmitForm1, register: registerForm1 } = useForm();

  const { data: courses, isLoading: coursesLoading, error: coursesError,refetch } = useGetCoursesQuery();
  // const [addSubProgram, { isLoading, error, isSuccess }] = useAddSubProgramMutation();

  //for table data
  const course = courses?.class || [];
  const classData = useClassData(page, rowsPerPage, course);
  const classId = useClassId(classData);
  const upcomingAdmission = useSelection(classId);

  const handlePageChange = React.useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = React.useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  if (coursesLoading) {
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

  if (coursesError) {
    return <div>Error loading classes: {coursesError.message}</div>;
  }

  const onSubmitForm1 = async (value) => {
    // console.log(value);
    alert("Form 1 submitted:\n" + JSON.stringify(value));
    const selectedProgramData = selectedPrograms.find((val) => val.name === value.programList);

    // Create a new FormData object
    const formData = new FormData();

    // Append form data fields
    formData.append("subprogramName", value.subprogramName);
    formData.append("program", value.program[0]);

    console.log("Form DATA: ", value);

    // const result = await addSubProgram({program,_id:selectedProgramData._id});
    const result = await addSubProgramByAxios(formData, selectedProgramData._id);

    if (result.status === 201) {
      refetch();
      setSelectedClass({existedClass:""})
      setSelectedPrograms([]);
      value.subprogramName = ""
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
    }

    if (result.status === 400) {
      toast.warn(`🦄 ${result}!`, {
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

  const handleClassChange = (event) => {
    const selectedClass = event.target.value;
    setSelectedClass({...selectedClass,existedClass:selectedClass});

    // Fetch programs for the selected class from API and update state
    const selectedClassData = courses.class.find((val) => val.name === event.target.value);
    setSelectedPrograms(selectedClassData ? selectedClassData.programs : []);
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
            <Stack 
            direction="row" 
            justifyContent="space-between" 
            spacing={4}
            >
              <Stack spacing={1}>
                <Typography 
                variant="h4"
                >
                  Add Program Category
                </Typography>
              </Stack>
            </Stack>
            <form onSubmit={handleSubmitForm1(onSubmitForm1)}>
              <React.Fragment>
                <Container
                  component="main"
                  maxWidth="md"
                  sx={{ mb: 4, border: "1px solid #ccc", borderRadius: "8px" }}
                >
                  <Paper 
                  variant="outlined" 
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                  >
                    <Typography 
                    component="h1" 
                    variant="h5" 
                    align="left" 
                    marginBottom={5}
                    >
                      Add Subprogram
                    </Typography>
                    <Box sx={{ my: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormLabel 
                          sx={{ textAlign: "left" }}
                          >
                            Choose Class
                          </FormLabel>
                          <Select
                            required
                            label="Class"
                            fullWidth
                            variant="standard"
                            {...registerForm1("classList")}
                            value={selectedClass.existedClass || ""} // Ensure value is not undefined
                            onChange={handleClassChange}
                          >
                            {courses?.class.map((val) => (
                              <MenuItem value={val.name} key={val._id}>
                                {val.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid 
                        item
                        xs={12}
                        >
                          <FormLabel 
                          sx={{ textAlign: "left" }}
                          >
                            Choose Program
                          </FormLabel>
                          <Select
                            required
                            label="Program"
                            fullWidth
                            variant="standard"
                            {...registerForm1("programList")}
                            defaultValue={selectedPrograms[0]}
                          >
                            {selectedPrograms.map((program) => (
                              <MenuItem value={program.name} key={program._id}>
                                {program.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid 
                        item 
                        xs={12} 
                        md={6}
                        >
                          <TextField
                            required
                            label="Program name"
                            fullWidth
                            variant="standard"
                            {...registerForm1("subprogramName")}
                          />
                        </Grid>
                        <Grid 
                        item 
                        xs={12} 
                        md={6}
                        >
                          <FormLabel 
                          sx={{ textAlign: "left", marginTop: 2 }}
                          >
                            Upload Program
                          </FormLabel>
                          <input 
                          type="file" 
                          {...registerForm1("program")} 
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={12}
                          sx={{ 
                            display: "flex", 
                            justifyContent: "flex-end" 
                          }}
                        >
                          <Button 
                          type="submit" 
                          variant="contained" 
                          sx={{ mt: 1, ml: 1 }} 
                          fullWidth
                          >
                            Add Program
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Container>
              </React.Fragment>
            </form>
          </Stack>
          <Stack>
              <SubProgramTable
                count={classData.length}
                items={classData}
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
