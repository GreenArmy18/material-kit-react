import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Snackbar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://doblrlvtjcvflsooaqsj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYmxybHZ0amN2Zmxzb29hcXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyODE2MzAsImV4cCI6MTk2Mzg1NzYzMH0.KSucW_sDBB7lUPR6Cjx0Z_zDWWRARzpTJZEiRTMvlIw';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
    setLoading(true);
  };
  const [loading, setLoading] = React.useState(false);

  const handleLoading = () => {
    setOpen(true);
    setLoading(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
      .min(6, 'Email must be at least 6 characters')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      setLoading(false);
      const { user, session, error } = supabase.auth.signIn({
        email: formik.values.email
      });
      // set loading to false
      console.log('Submitting', values.email);
      console.log('user', user);
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  console.log('loading', loading);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack sx={{ mb: 3 }}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          onClick={handleClick}
        >
          Login
        </LoadingButton>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message="Check your email for the verification link"
          onClose={handleClose}
        />
      </Form>
    </FormikProvider>
  );
}
