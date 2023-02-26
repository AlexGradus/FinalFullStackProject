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




export default function AdminPage() {
  const [collection, setCollection] = useState([]);
  const getUsers = async()=>{
    try{
        await axios.get("http://localhost:5000/api/auth/users",{
          
        }).then(res => {
          console.log(res.data)
        
    
        })
       
    } catch(e){
      if (axios.isAxiosError(e))  {
        alert(e.response?.data.message );
      } 
    }
   
  }
  useEffect(() => {
    getUsers()
},[]);
 
  const navigate = useNavigate();
  const currentUser = useSelector((state:MyState)=>state.app.currentUser);
  const CreateNewCollection = () =>{
      navigate("/myaccount/newcollection");
  }
 const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const getCollection = async(email:string)=>{
  try{
      await axios.post("http://localhost:5000/api/auth/collections",{
        email
      }).then(res => {
        setCollection(res.data.collection.collections);
  
      })
     
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
 
}



 
return (
    <Container >
        <Typography mt={2} align='center' component="h5" variant="h5">
            My Account :"{currentUser.name}"
          </Typography>
     
      <Box  mt={3}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {
          collection.map((colItem,index)=>{
            
            return <Grid key={colItem._id} item xs={6}>
            <Item>
              
            <Link className={s.textLink} to={'/myaccount/items'}>
              <Container onClick={() => {
                  console.log('admin')
                }}>
 
             <Box className={s.text}>
             Name: {colItem.collectionName}
             </Box>
                 
            
              <Typography  mt={1} align='center' component="h6" variant="h6">
                 Type: {colItem.collectionType}
               </Typography>
              <Box>
              <Typography mt={1} align='center' component="h6" variant="h6">
                Description:
               </Typography>
                <MDEditor.Markdown source={colItem.collectionMarkDownValue} style={{ whiteSpace: 'pre-wrap' }} />
              </Box>
              </Container>
              </Link>
            </Item>
          </Grid>
          })
        }
      </Grid>
      </Box>
    </Container>
  );
}
