import { s } from '.';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, IconButton, Typography } from '@mui/material';
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
import NewItem from '../../components/NewItem';
import { off } from 'process';
import { Delete, Edit, Preview } from '@mui/icons-material';




export default function ItemActions({params,getItems}) {
    const userEmail = useSelector((state:MyState)=>state.app.currentUser.email);
    const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
    const navigate = useNavigate();
    const currentUser = useSelector((state:MyState)=>state.app.currentUser);

     
  

  
    
    
    const deleteItem= async(email:string,collectionName:string, id: string)=>{
        try{
             await axios.post("http://localhost:5000/api/auth/deleteitem",{
              email,
              collectionName,
              id
            })
            getItems(userEmail,collectionName)
            
        } catch(e){
          if (axios.isAxiosError(e))  {
            alert(e.response?.data.message );
          } 
        }
       
      }
  

 
return (
   <Box>
    <IconButton onClick = {()=>{
     localStorage.setItem("ItemId", JSON.stringify(params.id));
     navigate("/myaccount/items/item");
    }}>
      <Preview />
    </IconButton>
    <IconButton onClick = {()=>{deleteItem(userEmail,collectionName,params.id)}}>
      <Delete />
    </IconButton>
   </Box>
   
  );
}