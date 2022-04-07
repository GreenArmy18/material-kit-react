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
import { supabase } from '../supabase-client';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
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
      const { user, session, error } = supabase.auth.signIn({
        email: formik.values.email
      });
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  console.log('loading', loading);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleLogin}>
        <Stack sx={{ mb: 3 }}>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
          Login
        </LoadingButton>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          message="Check your email for the verification link"
        />
      </Form>
    </FormikProvider>
  );
}
