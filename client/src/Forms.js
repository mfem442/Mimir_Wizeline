import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Maps from './Maps/Maps';
import HomeIcon from '@mui/icons-material/Home';

export default function Forms() {
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const response = await fetch("/prediction/", {
      method: 'POST',
      body: JSON.stringify({
        bedrooms: parseFloat(data.get('bedrooms')),
        bathrooms: parseFloat(data.get('bathrooms')),
        area: parseFloat(data.get('area')),
        Latitud: 20.5287517,
        Longitud: -105.9182489
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      const responseData = await response.json();
      setPrice(responseData.house_price);
    } else {
      console.log('Error:', response.status);
    }
  };
  

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Maps></Maps>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: "space-around"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <HomeIcon />
              </Avatar>
              <Typography component="h1" variant="h8">
                Mimir
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="bedrooms"
                  label="Habitaciones"
                  name="bedrooms"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="bathrooms"
                  label="Baños"
                  type="bathrooms"
                  id="bathrooms"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="area"
                  label="Área (m2)"
                  type="area"
                  id="area"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Buscar
                </Button>
              </Box>
              <Box  sx={{ mt: 1 }}>
                <Typography component="h1" variant="h7">
                  Precio: {price}
                </Typography>
              </Box>
            </Box>
          </Grid>
      </Grid>
    </>
  );
}
