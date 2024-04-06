import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Button, CircularProgress, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { useEmailVerifyMutation } from 'src/redux/api/adminApi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [emailVerify, { isLoading, isError, error }] = useEmailVerifyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can implement your password reset logic here.
    console.log('Password reset request submitted for email:', email);

    try {
      const apiCall = await emailVerify({ email });

      console.log(apiCall);

      setIsSubmitted(true);
      setSnackbarMessage('Password reset instructions have been sent to your email address.');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error:', error);
      setSnackbarMessage('Failed to reset password. Please try again.');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password | Your App Name</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '0 20px',
          backgroundColor: '#f5f5f5', // Set background color
        }}
      >
        <Paper
          sx={{
            maxWidth: 400,
            width: '100%',
            padding: 3,
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Grid 
          container 
          spacing={2} 
          justifyContent="center"
          >
            <Grid 
            item 
            xs={12}
            >
              <Typography 
              variant="h5" 
              align="center" 
              gutterBottom
              >
                Forgot Your Password?
              </Typography>
              {isSubmitted ? (
                <Typography 
                variant="body1" 
                color="textSecondary" 
                align="center"
                >
                  Password reset instructions have been sent to your email address.
                </Typography>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Grid 
                  container 
                  spacing={2} 
                  justifyContent="center"
                  >
                    <Grid 
                    item 
                    xs={12}
                    >
                      <TextField
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid 
                    item 
                    xs={12}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                      >
                        {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Grid>
          </Grid>
          <Box 
          mt={2} 
          textAlign="center"
          >
            <Link 
            href="/auth/login" 
            passHref
            >
              <Button 
              component="a" 
              variant="text" 
              color="primary"
              >
                Go Back
              </Button>
            </Link>
          </Box>
        </Paper>
      </Box>
      <Snackbar 
      open={openSnackbar} 
      autoHideDuration={6000} 
      onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
        onClose={() => setOpenSnackbar(false)} 
        severity={isError ? 'error' : 'success'}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ForgotPasswordPage;
