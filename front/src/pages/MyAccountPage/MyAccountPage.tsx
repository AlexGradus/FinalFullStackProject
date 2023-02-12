import { s } from '.';
import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';

export default function MyAccountPage() {
  const navigate = useNavigate();
  const currentUser = useSelector((state:MyState)=>state.app.currentUser);
 const CreateNewCollection = () =>{
  navigate("/myaccount/newcollection");
 }

  return (
    <Container >
        <Typography mt={2} align='center' component="h5" variant="h5">
            My Account :"{currentUser.name}"
          </Typography>
      <Box mt={3}>
      <Button onClick={CreateNewCollection}  variant="outlined">Create New Collection</Button>
      </Box>
    </Container>
  );
}
