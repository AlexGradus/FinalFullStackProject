import { s } from '.';
import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function MyAccountPage() {
  const navigate = useNavigate();

 const CreateNewCollection = () =>{
  navigate("/myaccount/newcollection");
 }

  return (
    <Container >
        <Typography mt={2} align='center' component="h5" variant="h5">
            My Account
          </Typography>
      <Box mt={3}>
      <Button onClick={CreateNewCollection}  variant="outlined">Create New Collection</Button>
      </Box>
    </Container>
  );
}
