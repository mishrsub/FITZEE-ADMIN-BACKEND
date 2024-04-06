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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useAddSubProgramMutation, useGetCoursesQuery } from "src/redux/api/courseApi";
import { addProgramDetails, addSubProgramByAxios } from "src/redux/apiReuse/courseFun";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [upcomingBatch, setUpcomingBatch] = React.useState({
    date: "",
    day: "",
    center: "",
    batch: "",
  });
  const [programSummary, setProgramSummary] = React.useState({
    phases: "",
    duration: "",
    numOfHrs: "",
    ratingOfCourse: "",
  });
  const [selectedClass, setSelectedClass] = React.useState({
    existedClass: "",
    existedProgram: "",
  });

  const [selectedPrograms, setSelectedPrograms] = React.useState([]);
  const [selectedSubPrograms, setSelectedSubPrograms] = React.useState([]);
  const {
    control,
    handleSubmit: handleSubmitForm2,
    register: registerForm2,
    setValue,
    reset: resetForm,
  } = useForm();
  const [pointInput, setPointInput] = React.useState([{ title: "", description: "" }]);
  const [keywordInput, setKeywordInput] = React.useState([{ keywordName: "", fullform: "" }]);

  const { data: courses, isLoading: coursesLoading, error: coursesError } = useGetCoursesQuery();

  console.log("====================================");
  console.log("Sub program data: ", courses);
  console.log("====================================");

  if (coursesLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
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
  // Handler for adding new keyword input fields
  const handleAddKeyword = () => {
    setKeywordInput([...keywordInput, { keywordName: "", fullForm: "" }]);
  };

  const onSubmitForm2 = async (value) => {
    console.log("====================================");
    console.log("VALUE SUB PROGRAM: ", value);
    console.log("====================================");
    setSelectedClass({ existedClass: "", existedProgram: "" });
    setSelectedPrograms([]);
    setSelectedSubPrograms([]);
    setPointInput([{ title: "", description: "" }]);

    console.log("VALUE DATA: ", value);
    // alert("Form 2 submitted:\n" + JSON.stringify(value));

    // Fetch programs for the selected class from API and update state
    const selectedProgramId = selectedPrograms.find((val) => val.name === value.programList);

    // Fetch sub-programs for the selected program from API and update state
    const selectedSubProgramId = selectedSubPrograms.find(
      (subpro) => subpro.name === value.subProgramList
    );

    // Create a new FormData object
    const formData = new FormData();

    console.log("====================================");
    console.log(selectedPrograms);
    console.log("====================================");

    // Append form data fields
    formData.append("programId", selectedProgramId?._id);
    formData.append("subProgramId", selectedSubProgramId?._id);
    formData.append("programBrief", value.programBrief);
    formData.append("programDescription", value.programDescription);
    formData.append("syllabusCovered", value.syllabusCovered);
    formData.append("subjectTaught", value.subjectTaught);
    formData.append("goals", value.goals);
    formData.append("programSummary", JSON.stringify(programSummary));
    formData.append("batchStartDate", JSON.stringify(upcomingBatch));

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

    // Append keyword titles and descriptions
    keywordInput.forEach((point, i) => {
      formData.append(`keyword[${i}][keywordName]`, value[`keywordName${i}`]);
      formData.append(`keyword[${i}][fullForm]`, value[`fullForm${i}`]);
    });

    // Iterate through FormData and log key-value pairs
    console.log("FORM NEW DATA:::::::::: ");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const result = await addProgramDetails(formData);

    console.log(result);

    if (result.status === 201) {
      resetForm();
      setProgramSummary({
        phases: "",
        duration: "",
        numOfHrs: "",
        ratingOfCourse: "",
      });
      setUpcomingBatch({
        date: "",
        day: "",
        center: "",
        batch: "",
      });
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
      resetForm();
      setSelectedClass({ existedClass: "", existedProgram: "" });
      setSelectedPrograms([]);
      setSelectedSubPrograms([]);
      setProgramSummary({
        phases: "",
        duration: "",
        numOfHrs: "",
        ratingOfCourse: "",
      });
      setUpcomingBatch({
        date: "",
        day: "",
        center: "",
        batch: "",
      });
      setPointInput([{ title: "", description: "" }]);
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
    setSelectedSubPrograms([]);
    setSelectedPrograms([]);
    const selectedClass = event.target.value;
    setSelectedClass({ ...selectedClass, existedClass: selectedClass });

    // Fetch programs for the selected class from API and update state
    const selectedClassData = courses.class.find((val) => val.name === event.target.value);
    setSelectedPrograms(selectedClassData ? selectedClassData.programs : []);
  };

  const handleProgramChange = (event) => {
    // Fetch sub-programs for the selected program from API and update state
    const getSubProgram = selectedPrograms.find((subpro) => subpro.name === event.target.value);
    setSelectedSubPrograms(getSubProgram ? getSubProgram?.subprograms : []);
  };

  const handleAutocompleteChange = (fieldName, event, newValue) => {
    setValue(fieldName, newValue || []);
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
                <Typography variant="h4">Add Program Category</Typography>
              </Stack>
            </Stack>
            <form onSubmit={handleSubmitForm2(onSubmitForm2)} enctype="multipart/form-data">
              <React.Fragment>
                <Container
                  component="main"
                  maxWidth="md"
                  sx={{
                    mb: 4,
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h5" align="left" marginBottom={5}>
                      Add Subprogram Detail
                    </Typography>

                    {/* Edit icon on the right side */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        marginTop: "1rem",
                      }}
                    >
                      <IconButton onClick={""} color="primary" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ my: 3 }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <FormLabel sx={{ textAlign: "left" }}>Choose Class</FormLabel>
                          <Select
                            required
                            label="Class"
                            fullWidth
                            variant="standard"
                            {...registerForm2("classList")}
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
                        <Grid item xs={12}>
                          <FormLabel sx={{ textAlign: "left" }}>Choose Program</FormLabel>
                          <Select
                            required
                            label="Program"
                            fullWidth
                            variant="standard"
                            {...registerForm2("programList")}
                            onChange={handleProgramChange}
                            defaultValue={selectedPrograms[0]}
                          >
                            {selectedPrograms.map((program) => (
                              <MenuItem value={program.name} key={program._id}>
                                {program.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </Grid>
                        <Grid item xs={12}>
                          <FormLabel sx={{ textAlign: "left" }}>Choose Sub Program</FormLabel>
                          <Select
                            required
                            label="Program"
                            fullWidth
                            variant="standard"
                            {...registerForm2("subProgramList")}
                          >
                            {selectedPrograms.length > 0 &&
                              selectedSubPrograms.map((subprogram) => (
                                <MenuItem value={subprogram.name} key={subprogram._id}>
                                  {subprogram.name}
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
                            {...registerForm2("programDescription")}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            label="Syllabus Covered"
                            fullWidth
                            variant="standard"
                            {...registerForm2("syllabusCovered")}
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

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="goals"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <Autocomplete
                                multiple
                                id="goals"
                                options={["NTSE", "RMO", "GPE", "VVM", "IPM"]}
                                freeSolo
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Goals"
                                    variant="standard"
                                    color="success"
                                  />
                                )}
                                {...field}
                                onChange={(event, newValue) =>
                                  handleAutocompleteChange("goals", event, newValue)
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
                        Program Summary
                      </Typography>
                      <Grid container spacing={3}>
                        {/* First line */}
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Phase"
                            fullWidth
                            variant="standard"
                            value={Number(programSummary.phases)}
                            onChange={(e) =>
                              setProgramSummary({ ...programSummary, phases: e.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Duration"
                            fullWidth
                            variant="standard"
                            value={programSummary.duration}
                            onChange={(e) =>
                              setProgramSummary({ ...programSummary, duration: e.target.value })
                            }
                          />
                        </Grid>
                        {/* Second line */}
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="No. of Hrs"
                            fullWidth
                            variant="standard"
                            value={programSummary.numOfHrs}
                            onChange={(e) =>
                              setProgramSummary({ ...programSummary, numOfHrs: e.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Rating of the course"
                            fullWidth
                            variant="standard"
                            value={programSummary.ratingOfCourse}
                            onChange={(e) =>
                              setProgramSummary({
                                ...programSummary,
                                ratingOfCourse: e.target.value,
                              })
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ my: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Upcoming Batch
                      </Typography>
                      <Grid container spacing={3}>
                        {/* First line */}
                        <Grid item xs={12} md={6}>
                          <TextField
                            placeholder="YYYY-MM-DD"
                            required
                            label="Date"
                            fullWidth
                            variant="standard"
                            value={upcomingBatch.date}
                            onChange={(e) =>
                              setUpcomingBatch({ ...upcomingBatch, date: e.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Day"
                            fullWidth
                            variant="standard"
                            value={upcomingBatch.day}
                            onChange={(e) =>
                              setUpcomingBatch({ ...upcomingBatch, day: e.target.value })
                            }
                          />
                        </Grid>
                        {/* Second line */}
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Center"
                            fullWidth
                            variant="standard"
                            value={upcomingBatch.center}
                            onChange={(e) =>
                              setUpcomingBatch({ ...upcomingBatch, center: e.target.value })
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            label="Batch"
                            fullWidth
                            variant="standard"
                            value={upcomingBatch.batch}
                            onChange={(e) =>
                              setUpcomingBatch({ ...upcomingBatch, batch: e.target.value })
                            }
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box sx={{ my: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Add Keyword
                      </Typography>
                      <Grid container spacing={3}>
                        {keywordInput.map((point, index) => (
                          <React.Fragment key={index}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                required
                                label={`Keyword Title ${index + 1}`}
                                fullWidth
                                variant="standard"
                                {...registerForm2(`keywordName${index}`, { required: true })}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <TextField
                                required
                                label={`keyword Full Form ${index + 1}`}
                                fullWidth
                                variant="standard"
                                {...registerForm2(`fullForm${index}`, { required: true })}
                              />
                            </Grid>
                          </React.Fragment>
                        ))}
                        <Grid item xs={12} md={2}>
                          <Button
                            type="button"
                            onClick={handleAddKeyword}
                            variant="contained"
                            sx={{ mt: 0.5, ml: 85 }}
                            fullWidth
                          >
                            keyword
                          </Button>
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
                    <Button type="submit" variant="contained" sx={{ mt: 1, ml: 1 }} fullWidth>
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

// const [programSummary,setProgramSummary] = React.useState({
//   c: 0,
//   duration: "",
//   numOfHrs: "",
//   ratingOfCourse: 0.0,
// })

// // Create the programSummary object
// const programSummaryObj = {
//   phases: Number(value.phases),
//   duration: value.duration,
//   numOfHrs: value.numOfHrs,
//   ratingOfCourse: Number(value.ratingOfCourse),
// };

// // Stringify the programSummary object
// const programSummaryString = JSON.stringify(programSummaryObj);

// // Append the programSummary to formData
// formData.append("programSummary", programSummaryString);
