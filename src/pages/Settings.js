import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Stack, Box, Button, Typography, Container, Grid, Paper } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.default_dark,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

export default function Settings() {
  return (
    <RootStyle title="HI">
      <Grid
        container
        spacing={2}
        sx={{
          maxWidth: 480,
          maxHeight: 500,
          margin: 'auto',
          textAlign: 'center'
        }}
      >
        <Grid item xs={4}>
          <Item>username</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>fisrt name</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>last name</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>email</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>save</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>null</Item>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
