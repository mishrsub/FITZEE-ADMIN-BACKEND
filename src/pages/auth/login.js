import { useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useAdminLoginMutation } from "src/redux/api/adminApi";
import { useAuthContext } from "src/contexts/auth-context";

const Page = () => {
  const { signIn } = useAuthContext(); // Get the signIn function from the authentication context...
  const [adminLogin, { isLoading, isError, error }] = useAdminLoginMutation(); //some changes
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // Perform login
        const loginData = { email: values.email, password: values.password };
        const loginUser = await adminLogin(loginData).unwrap();

        console.log("Login Users");
        if (loginUser.status === 200) {
          // Pass the user data to signIn function
          signIn(loginUser.user); // Assuming loginUser.user contains user data

          // Redirect on successful login
          router.push("/");
        }
        console.log(loginUser);
      } catch (error) {
        // Handle login error
        if (error.data && error.data.message) {
          setErrorMessage(error.data.message);
        } else {
          setErrorMessage("An error occurred.");
        }
        helpers.setSubmitting(false);
      }
    },
  });

  const handleForgotPassword = () => {
    // Implement logic to handle forgot password action
    // For example, you can redirect the user to a forgot password page
    router.push("forgot-password");
  };

  return (
    <>
      <Head>
        <title>Login | Fitjee Mumbai</title>
      </Head>
      <Box
        sx={{
          backgroundImage: `url('your-background-image.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "0 20px",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            width: "100%",
            px: 3,
            py: "100px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h5">Admin Login</Typography>
            </Stack>
            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Continue"}
              </Button>
            </form>
            {isError && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {errorMessage}
              </Typography>
            )}
            <Button color="primary" onClick={handleForgotPassword} sx={{ mt: 2 }} variant="text">
              Forgot Password?
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;
