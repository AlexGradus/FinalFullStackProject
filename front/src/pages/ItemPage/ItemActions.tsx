import { s } from '.';
import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import axios from 'axios';
import { Delete, Preview } from '@mui/icons-material';




export default function ItemActions({params,getItems}:any) {
    const userEmail = useSelector((state:MyState)=>state.app.currentUser.email);
    const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
    const navigate = useNavigate();

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