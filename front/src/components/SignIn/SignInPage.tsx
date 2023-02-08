import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { s } from './';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../store/appReducer';
import { useState } from 'react';
import { Alert } from '@mui/material';






export default function SignIn() {
  const [alertContent, setAlertContent] = useState('');
  const login = (email:string, password:string, name:string)=>{
    return async (dispatch: (arg0: { type: string; payload: any; }) => void) =>{
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login",{
                email,
                password,
                name 
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem("token",response.data.token)
        } catch(e){
          if (axios.isAxiosError(e))  {
            setAlertContent(e.response?.data.message );
          } 
        }

    }
  
   
}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
 

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit((data) => (dispatch as any)(login(data.email,data.password,data.name)))}>
            <TextField
              style = {{width: 400}} 
              margin="normal"
              required
         
              id="email"
              label="Email Address"
              {...register('email', { required: true })}
              autoComplete="email"
              autoFocus
            />
            {errors.email && <p className={s.error}>Email is required.</p>}
            <TextField
              style = {{width: 400}} 
              margin="normal"
              required
              
              {...register('password', { required: true })}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && <p className={s.error}>Password is required.</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {alertContent? <Alert severity='error'>{alertContent}</Alert> : <></> }
          </Box>
        </Box>
      </Container>

  );
}



 
