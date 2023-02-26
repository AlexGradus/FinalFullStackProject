import { s } from '.';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
import NewItem from '../../components/NewItem';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditItem from './EditItem';



export default function CurrentItem() {
  const userEmail = useSelector((state:MyState)=>state.app.currentUser.email);
  const itemId = JSON.parse( localStorage.getItem("ItemId") as string );
  const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
  const [currentItem, setCurrentItem] = useState(null as any);

  const getCurrentItem = async(email:string,collectionName:string,id: string)=>{
    try{
        await axios.post("http://localhost:5000/api/auth//currentitem",{
          email,collectionName,id
        }).then(res => {
          setCurrentItem(res.data.result);
         
          
    
        })
       
    } catch(e){
      if (axios.isAxiosError(e))  {
        console.log(e.response?.data.message );
      } 
    }
  }
  useEffect(() => {
    getCurrentItem(userEmail,collectionName,itemId)
  },[]);

 
return (
  <Card sx={{ width: 275 }}>
  <CardContent>
  <div>
        Current Item: {currentItem?currentItem.item.itemName:''}
   </div>
   <div>
        Id: {currentItem?currentItem.item.id:''}
   </div>
   {currentItem?currentItem.fieldsLocation[0]? <Box>
   <div>
        Made In: {currentItem?currentItem.item.madeIn:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[1]? <Box>
   <div>
       Description: <MDEditor.Markdown source={currentItem?currentItem.item.description:''} style={{ whiteSpace: 'pre-wrap' }} />
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[2]? <Box>
   <div>
       Comments: <MDEditor.Markdown source={currentItem?currentItem.item.comments:''} style={{ whiteSpace: 'pre-wrap' }} />
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[3]? <Box>
   <div>
        Damage: {currentItem?currentItem.item.damage:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[4]? <Box>
   <div>
        Condition: {currentItem?currentItem.item.condition:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[5]? <Box>
   <div>
       Notes: <MDEditor.Markdown source={currentItem?currentItem.item.notes:''} style={{ whiteSpace: 'pre-wrap' }} />
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[6]? <Box>
   <div>
        For Sale: {currentItem?`${currentItem.item.forSale}`:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[7]? <Box>
   <div>
        Foreign: {currentItem?`${currentItem.item.foreign}`:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[8]? <Box>
   <div>
        In Stock: {currentItem?`${currentItem.item.inStock}`:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[9]? <Box>
   <div>
        Created: {currentItem?currentItem.item.created:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[10]? <Box>
   <div>
       Bought: {currentItem?currentItem.item.bought:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[11]? <Box>
   <div>
       First Registration: {currentItem?currentItem.item.firstRegistration:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[12]? <Box>
   <div>
        Amount: {currentItem?currentItem.item.amount:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[13]? <Box>
   <div>
       Ready To Sail: {currentItem?currentItem.item.readyToSail:''} $
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[14]? <Box>
   <div>
       Cost: {currentItem?currentItem.item.cost:''} $
   </div>
   </Box>: <></>:'' }


  </CardContent>
  <CardActions>
  <React.Fragment >
                  <EditItem
                    data={currentItem}
                    getCurrentItem={getCurrentItem}
                   
  
                  />
            </React.Fragment>
  </CardActions>
</Card>

  
  );
}
