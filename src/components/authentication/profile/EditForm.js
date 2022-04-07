import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { supabase } from '../supabase-client';
import Avatar from './Avatar';
// ----------------------------------------------------------------------

const EditForm = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setNickName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loadingOut, setLoadingOut] = useState(false);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      // const { hh } = await supabase.fetch(`/users/${user.id}`);
      console.log(user.user_metadata.first_name);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatarUrl`, 'firstName', 'lastName')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setNickName(data.username);
        setAvatarUrl(data.avatarUrl);
        setFirstName(data.firstName);
        setLastName(data.lastName);
      }
    } catch (error) {
      alert('HELLO');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();
      console.log('user', user);
      const updates = {
        id: user.id,
        username,
        avatarUrl,
        firstName,
        lastName
      };

      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal' // Don't return the value after inserting
      });

      if (error) {
        throw error;
      } else {
        alert('Profile updated successfully');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoadingOut(true);
      const user = supabase.auth.user();

      const { error } = supabase.auth.signOut();

      if (error) {
        throw error;
      } else {
        alert('Sign out successfully');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoadingOut(false);
    }
  };

  return (
    <form onSubmit={updateProfile}>
      <Stack direction="column" align="center" justify="center" spacing={4} alignItems="center">
        <Avatar
          url={avatarUrl}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ username, firstName, lastName, avatarUrl: url });
          }}
        />
      </Stack>
      <Stack spacing={3} mt={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            id="firstName"
            label="First name"
            value={firstName || ''}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            fullWidth
            id="lastName"
            label="Last name"
            value={lastName || ''}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Stack>

        <TextField
          fullWidth
          autoComplete="username"
          id="username"
          type="text"
          label="Nickname"
          value={username || ''}
          onChange={(e) => setNickName(e.target.value)}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={loading}>
          Update profile
        </LoadingButton>
        <LoadingButton
          fullWidth
          size="large"
          type="button"
          variant="contained"
          disabled={loadingOut}
          onClick={() => signOut()}
        >
          Sign Out
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default EditForm;
