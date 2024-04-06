import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
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
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useGetCoursesQuery } from "src/redux/api/courseApi";
import { addProgramDetail } from "src/redux/apiReuse/comCourseFun";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetCompClassQuery } from "src/redux/api/compCourseApi";

const Page = () => {
  const [selectedClass, setSelectedClass] = React.useState("");
  const [selectedProgram, setSelectedProgram] = React.useState("");
  const [programDetail, setProgamDetail] = React.useState({
    subjectTaught: [],
  });
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const {
    control,
    handleSubmit: handleSubmitForm2,
    register: registerForm2,
    setValue,
    reset,
  } = useForm();
  const [pointInput, setPointInput] = React.useState([{ title: "", description: "" }]);

  const { data: courses, isLoading: coursesLoading, error: coursesError } = useGetCompClassQuery();

  console.log("====================================");
  console.log("Sub program data: ", courses);
  console.log("====================================");

  if (coursesLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (coursesError) {
    return <div>Error loading classes: {coursesError.message}</div>;
  }
  const handleAddPoint = () => {
    setPointInput([...pointInput, { title: "", description: "" }]);
  };

  const onSubmitForm2 = async (value) => {
    console.log("====================================");
    console.log("VALUE Detail PROGRAM: ", value);
    console.log("====================================");
    reset();
    setSelectedClass({ existedClass: "", existedProgram: "" });
    setSelectedPrograms([]);
    setPointInput([{ title: "", description: "" }]);

    console.log(value);
    alert("Form 2 submitted:\n" + JSON.stringify(value));

    // Fetch programs for the selected class from API and update state
    const selectedProgramId = selectedPrograms.find((val) => val.name === value.programList);

    // Create a new FormData object
    const formData = new FormData();

    console.log("====================================");
    console.log(selectedPrograms);
    console.log("====================================");

    // Append form data fields
    formData.append("programId", selectedProgramId._id);
    formData.append("programBrief", value.programBrief);
    formData.append("programDescription", value.programDescription); // Add this line

    formData.append("subjects", value.subjectTaught);

    // Iterate through selected files using forEach [upload multiple images]
    const selectedFiles = value.carosImg;

    // Iterate through selected files
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      formData.append("carosImg", file);
    }

    // Append point titles and descriptions
    pointInput.forEach((point, i) => {
      formData.append(`programPoint[${i}][title]`, value[`pointTitle${i}`]);
      formData.append(`programPoint[${i}][description]`, value[`pointDescription${i}`]);
    });

    // Iterate through FormData and log key-value pairs
    console.log("FORM NEW DATA:::::::::: ");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const result = await addProgramDetail(formData);

    console.log(result);

    if (result.status === 201)
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

    if (result.status === 400) {
      toast.warn(`🦄 ${result.data.error}!`, {
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

  const handleClassChange = async (event) => {
    const selectedClasses = event.target.value;
    setSelectedClass(selectedClasses);

    // Fetch programs for the selected class from API and update state
    try {
      const selectedClassData = courses.class.find((val) => val.name === selectedClasses);
      const programs = selectedClassData ? selectedClassData.programs : [];

      setSelectedPrograms(programs);

      console.log("This is my selected : ", selectedClassData);
      console.log("This is my selected programs: ", programs);
    } catch (error) {
      console.error("Error fetching programs:", error.message);
    }
  };

  const handleAutocompleteChange = (fieldName, event, newValue) => {
    setValue(fieldName, newValue || []);
  };

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
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
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Add Program Detail</Typography>
              </Stack>
            </Stack>
            <form onSubmit={handleSubmitForm2(onSubmitForm2)}>
              <React.Fragment>
                <Container
                  component="main"
                  maxWidth="md"
                  sx={{ mb: 4, border: "1px solid #ccc", borderRadius: "8px" }}
                >
                  <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h5" align="left" marginBottom={5}>
                      Add Program Detail
                    </Typography>
                    <Box sx={{ my: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormLabel sx={{ textAlign: "left" }}>Choose Class</FormLabel>
                          <Select
                            required
                            label="Class"
                            fullWidth
                            variant="standard"
                            // {...registerForm2("eligibleClass")}
                            value={selectedClass} // Ensure value is not undefined
                            onChange={handleClassChange}
                          >
                            {courses?.class.map((val) => (
                              <MenuItem value={val.name} key={val._id}>
                                {val.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <FormLabel sx={{ textAlign: "left" }}>Choose Program</FormLabel>
                          <Select
                            required
                            label="Heading"
                            fullWidth
                            variant="standard"
                            {...registerForm2("heading")}
                            value={selectedProgram}
                            onChange={handleProgramChange}
                          >
                            {selectedPrograms.map((program) => (
                              <MenuItem value={program.heading} key={program._id}>
                                {program.heading}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            label="Program Brief"
                            fullWidth
                            variant="standard"
                            {...registerForm2("programBrief")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            label="Program Description"
                            fullWidth
                            variant="standard"
                            {...registerForm2("programDescription")} // Add this line
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="subjectTaught"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <Autocomplete
                                multiple
                                id="subjectTaught"
                                options={[
                                  "MATH",
                                  "ENGLISH",
                                  "SCIENCE",
                                  "PHYSICS",
                                  "CHEMISTRY",
                                  "MENTAL-ABILITY",
                                ]}
                                freeSolo
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Subject Taught"
                                    variant="standard"
                                    color="success"
                                  />
                                )}
                                {...field}
                                onChange={(event, newValue) =>
                                  handleAutocompleteChange("subjectTaught", event, newValue)
                                }
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormLabel sx={{ textAlign: "left" }}>Upload Banner </FormLabel>
                          <input type="file" {...registerForm2("carosImg")} multiple />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ my: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Add Point
                      </Typography>
                      <Grid container spacing={3}>
                        {pointInput.map((point, index) => (
                          <React.Fragment key={index}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                required
                                label={`Point Title ${index + 1}`}
                                fullWidth
                                variant="standard"
                                {...registerForm2(`pointTitle${index}`, { required: true })}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                required
                                label={`Point Description ${index + 1}`}
                                fullWidth
                                variant="standard"
                                {...registerForm2(`pointDescription${index}`, { required: true })}
                              />
                            </Grid>
                          </React.Fragment>
                        ))}
                        <Grid item xs={12} md={2}>
                          <Button
                            type="button"
                            onClick={handleAddPoint}
                            variant="contained"
                            sx={{ mt: 0.5, ml: 85 }}
                            fullWidth
                          >
                            Add Point
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button
                      type="submit" // Make sure the button type is "submit"
                      variant="contained"
                      sx={{ mt: 1, ml: 1 }}
                      fullWidth
                    >
                      Add Program Detail
                    </Button>
                  </Paper>
                </Container>
              </React.Fragment>
            </form>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
