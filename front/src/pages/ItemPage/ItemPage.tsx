import { s } from '.';
import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Modal from '@mui/material/Modal';




export default function ItemPage() {
  
 
return (
    <Container >
        <Typography mt={2} align='center' component="h5" variant="h5">
            My Account :""
          </Typography>
      <Box mt={3}>
      <Button  variant="outlined">Create New Item</Button>
      </Box>
      
    </Container>
  );
}
