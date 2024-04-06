import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { addWorkshop } from "src/redux/apiReuse/event";
import { useGetWorkshopsQuery } from "src/redux/api/eventApi";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';


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
    control,
  } = useForm();
  const {
    handleSubmit: handleSubmitForm2,
    register: registerForm2,
    setValue: setValueForm2,
    reset: resetForm2,
  } = useForm();

  const [subtitle, setSubTitle] = React.useState([{ title: "", description: "" }]);
  const [courseType, setCourseType] = React.useState("paid");
  const [workshop, setWorkshop] = React.useState();

  const { data: workshopsResponse, isLoading, isError } = useGetWorkshopsQuery();

  const resultData = workshopsResponse?.workshops || [];

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);
    setValueForm1("catalog", event.target.value); // Fixed: use 'catalog' instead of 'courseType'
  };

  const handleChange = (event) => {
    setWorkshop(event.target.value);
  };

  const onSubmitForm1 = async (value) => {
    try {
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("image", value.image[0]);
      formData.append("address", value.address);
      formData.append("timing", value.timing);
      formData.append("catalog", courseType);

      const workshop = await addWorkshop(formData);

      if (workshop.status === 201) {
        // Manually reset the values of controlled components
        setValueForm1("title", "");
        setValueForm1("description", "");
        setValueForm1("address", "");

        // Reset the form using resetForm1
        resetForm1();

        toast.success(`🦄 ${workshop.message}!`, {
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
      if (workshop.status === 400) {
        toast.error(`🦄 ${workshop.data.message}!`, {
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
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      toast.error(`🦄 ${error.message}!`, {
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
      const formData = new FormData();
      formData.append("title", value.title);
      formData.append("description", value.description);
      formData.append("image", value.image[0]);
      formData.append("address", value.address);
      formData.append("timing", value.timing);
      formData.append("catalog", courseType);

      const workshop = await addWorkshop(formData);

      if (workshop.status === 201) {
        // Manually reset the values of controlled components
        setValueForm1("title", "");
        setValueForm1("description", "");
        setValueForm1("address", "");

        // Reset the form using resetForm1
        resetForm1();

        toast.success(`🦄 ${workshop.message}!`, {
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
      if (workshop.status === 400) {
        toast.error(`🦄 ${workshop.data.message}!`, {
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
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      toast.error(`🦄 ${error.message}!`, {
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
    setValueForm1("timing", date, { shouldValidate: true });
  };

  const addSubtitle = () => {
    setSubTitle([...subtitle, { title: "", description: "" }]);
  };

  const addSubDescription = () => {
    const newSubtitles = subtitle.map(subtitleField => ({
      ...subtitleField,
      description: subtitleField.description || "" // Preserve existing description or add an empty one
    }));
    setSubTitle([...newSubtitles, { description: "" }]);
  };
  

  return (
    <>
      <Head>
        <title>Add Workshop | Fitjee</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Stack spacing={1} sx={{ marginLeft: 10, marginBottom: 5 }}>
          <Typography variant="h4">Add Workshop</Typography>
        </Stack>
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
                    Add Workshop
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          label="Title"
                          placeholder="Title"
                          fullWidth
                          variant="standard"
                          {...registerForm1("title")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          label="Description"
                          placeholder="Description"
                          fullWidth
                          variant="standard"
                          {...registerForm1("description")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          required
                          label="Address"
                          placeholder="Address"
                          fullWidth
                          variant="standard"
                          {...registerForm1("address")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ textAlign: "left", marginTop: 2 }}>Upload image</FormLabel>
                        <input type="file" {...registerForm1("image")} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <DatePicker
                          fullWidth
                          label="Date"
                          {...registerForm1("timing")}
                          onChange={handleDateChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel>Choose course type</FormLabel>
                        {/* Use Controller for the RadioGroup */}
                        <Controller
                          name="catalog" // This should match your field name
                          control={control}
                          defaultValue="paid" // Set the default value if needed
                          render={({ field }) => (
                            <RadioGroup
                              name="radio-buttons-group"
                              sx={{ flexDirection: "row" }}
                              value={field.value} // Use field value
                              onChange={(e) => {
                                field.onChange(e);
                                handleCourseTypeChange(e); // Call your custom function
                              }}
                            >
                              <FormControlLabel
                                value="upcoming"
                                control={<Radio size="small" color="success" />}
                                label="Upcoming"
                              />
                              <FormControlLabel
                                value="paid"
                                control={<Radio color="secondary" />}
                                label="Paid"
                              />
                            </RadioGroup>
                          )}
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button type="submit" variant="contained" sx={{ mt: 1, ml: 1 }} fullWidth>
                          Add Workshop
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Container>
            </form>
          </Stack>
        </Container>

        <Container maxWidth="xl">
          <Stack spacing={3}>
            <form onSubmit={handleSubmitForm2(onSubmitForm2)}>
              <Container
                component="main"
                maxWidth="md"
                sx={{ mb: 4, border: "1px solid #ccc", borderRadius: "8px" }}
              >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                  <Typography component="h1" variant="h5" align="left" marginBottom={5}>
                    Add Workshop Detail
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Grid item xs={12} md={6}>
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Select workshop</InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          // multiple
                          value={workshop}
                          onChange={handleChange}
                        >
                          {resultData.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                              {item.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid container spacing={3}>
                      {subtitle.map((subtitleField, index) => (
                        <React.Fragment key={index}>
                          <Grid item xs={12} md={12}>
                            <TextField
                              required
                              label={`Subtitle ${index + 1} Title`}
                              placeholder={`Subtitle ${index + 1} Title`}
                              fullWidth
                              variant="standard"
                              {...registerForm2(`subtitle[${index}].title`)}
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <Box sx={{ position: "relative" }}>
                              <TextField
                                required
                                label={`Subtitle ${index + 1} Description`}
                                placeholder={`Subtitle ${index + 1} Description`}
                                fullWidth
                                variant="standard"
                                {...registerForm2(`subtitle[${index}].description`)}
                              />
                              <IconButton
                                aria-label="add"
                                sx={{
                                  position: "absolute",
                                  top: "50%",
                                  right: "-20px",
                                  transform: "translateY(-50%)",
                                }}
                                onClick={addSubtitle}
                              >
                                <AddCircleOutlineIcon onClick={addSubDescription}/>
                              </IconButton>
                            </Box>
                          </Grid>
                        </React.Fragment>
                      ))}

                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mt: 1, ml: 3, fontSize: 11 }}
                          onClick={addSubtitle}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <AddIcon fontSize="small" />
                            Add Subtitle
                          </Stack>
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button type="submit" variant="contained" sx={{ mt: 1, ml: 1 }} fullWidth>
                          Add Workshop Detail
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
