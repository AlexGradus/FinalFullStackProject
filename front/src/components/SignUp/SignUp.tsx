import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FieldValues, useForm } from 'react-hook-form';
import { s } from './';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';


export default function SignUp() {
  const [alertContent, setAlertContent] = useState('');
  const registration = async(email:string, password:string, name:string)=>{
    try{
        const response = await axios.post("http://localhost:5000/api/auth/registration",{
            email,
            password,
            name 
        })
        setAlertContent(response.data.message);
    } catch(e){
      if (axios.isAxiosError(e))  {
        setAlertContent(e.response?.data.message );
      } 
    
        
      
    }
   
}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registrate =(data: FieldValues)=>{
    registration(data.email,data.password,data.name)
   
  }


  return (
   
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          
          <Box component="form" noValidate onSubmit={handleSubmit((data) => 
            registrate(data))
           
            }>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  {...register('name', { required: true })}
                  required
                  style = {{width: 400}} 
                  id="name"
                  label="name"
                  autoFocus
                />
                {errors.name && <p className={s.error}>Name is required.</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  style = {{width: 400}} 
                  id="email"
                  label="Email Address"
                  {...register('email', { required: true })}
                  autoComplete="email"
                />
                {errors.email && <p className={s.error}>Email is required.</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  style = {{width: 400}} 
                  {...register('password', { required: true })}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                {errors.password && <p className={s.error}>Password is required.</p>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {alertContent? <Alert severity='info'>{alertContent}</Alert> : <></> }
          </Box>
        </Box>
      </Container>

  );
}