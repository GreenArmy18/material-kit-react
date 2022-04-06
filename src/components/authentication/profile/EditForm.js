import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

import { createClient } from '@supabase/supabase-js';
import { values } from 'lodash';

const supabaseUrl = 'https://doblrlvtjcvflsooaqsj.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvYmxybHZ0amN2Zmxzb29hcXNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgyODE2MzAsImV4cCI6MTk2Mzg1NzYzMH0.KSucW_sDBB7lUPR6Cjx0Z_zDWWRARzpTJZEiRTMvlIw';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----------------------------------------------------------------------

export default function EditForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
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

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Too Short!').required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      console.log(
        'Submitting',
        formik.values.email,
        formik.values.password,
        formik.values.firstName,
        formik.values.lastName
      );
      const { user, session, error } = supabase.auth.update(
        {
          email: formik.values.email,
          password: formik.values.password
        },
        {
          data: {
            first_name: formik.values.firstName,
            last_name: formik.values.lastName
          }
        }
      );
      console.log('Updating', values.email, values.password, values.firstName, values.lastName);
      // navigate('/login', { replace: true });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
            onClick={handleClick}
          >
            Update profile
          </LoadingButton>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            message="Your details have been updated"
            onClose={handleClose}
          />
        </Stack>
      </Form>
    </FormikProvider>
  );
}
