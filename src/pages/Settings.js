import React, { useState } from 'react';
// material
import { Autocomplete, Avatar, Card, CardContent, Container, Divider, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UserMoreMenu } from '../sections/@dashboard/user';
// components
import Palette from '../theme/palette';
import Page from '../components/Page';
import Iconify from '../components/Iconify';

export default function Settings() {
  // const countryHTML = <Grid container spacing={2}> <Grid item xs={5}> <Autocomplete limitTags={2} options={top100Films} getOptionLabel={(option) => option.title} renderInput={(params) => ( <TextField {...params} label="Select Country you want to serve" placeholder="Countries" /> )} sx={{ width: '100%' }} /> </Grid> <Grid item xs={5}> <TextField fullWidth autoComplete="username" type="color" label="" /> </Grid> <Grid item xs={2} sx={{ alignSelf: "center" }}> <Avatar sx={{ cursor: 'pointer', ml: 'auto', background: Palette.error.main }}> <Iconify icon="bi:trash" width={20} height={20} /> </Avatar> </Grid> </Grid>

  const [Countries, setCountries] = useState([

  ])
  const addCountries = () => {

  }

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Stack>

        <Card spacing={2}>
          <CardContent>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5"> Countries </Typography>
              <Avatar sx={{ cursor: 'pointer', ml: 'auto', background: Palette.primary.main }}>
                <Iconify icon="akar-icons:plus" width={20} height={20} />
              </Avatar>
            </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#ID</TableCell>
                    <TableCell align="center">Country</TableCell>
                    <TableCell align="center">Color Code</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row"> 1 </TableCell>
                      <TableCell align="center">INDIA</TableCell>
                      <TableCell align="center"><span className='color-bx' style={{ backgroundColor: '#920061', displayInline: 'block', padding: '.3rem', borderRadius: '5px', color: '#ffffff' }}>#920061</span></TableCell>
                      <TableCell align="right"> <UserMoreMenu /> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

const top100Films = [
  { title: 'Canada' },
  { title: 'U.S.A.' },
  { title: 'INDIA' },
];
