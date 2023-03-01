import { s } from '.';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import {  NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ItemActions from './ItemActions';
import { useTranslation } from 'react-i18next';




export default function ItemPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState([]);
  
  const userEmail = useSelector((state:MyState)=>state.app.currentUser.email);
  const navigate = useNavigate();
  const CreateNewItem = () =>{
    navigate("/myaccount/items/newitem");
}
const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
const fields = ['madeIn','description','comments','damage','condition','notes','forSale','foreign','inStock','created','bought','firstRegistration','amount','readyToSail','cost']
const getItems = async(email:string,collectionName:string)=>{
  try{
      await axios.post("http://localhost:5000/api/auth/items",{
        email,collectionName
      }).then(res => {
        
        setItems(res.data.items.colItems);
        const UsedFields: GridColDef[] = [
          { 
            field: 'actions',
            headerName: 'Actions',
             width: 250,
            renderCell:(params)=><ItemActions {...{params,getItems}} />
            },
          { field: 'id', headerName: 'ID', width: 250},
          { field: 'itemName', headerName: 'Name', width: 150 },
          
        ];
        res.data.items.fieldsLocation.map((item:any,index:number)=>{
          if(item){
           
            UsedFields.push({field:fields[index],headerName: fields[index], width: 150})
          }
        })
        setColumns(UsedFields as any);
  
      })
     
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
}
useEffect(() => {
  getItems(userEmail,collectionName)
},[]);


 
return (
    <Container >
       <div className={s.button} ><NavLink className={s.back_button_position} to ="/myaccount/"><Button variant="outlined">{t('Buttons.Back')}</Button></NavLink></div>
        <Typography mt={2} align='center' component="h5" variant="h5">
        {t('GeneralItemsPage.MyCollection')}:"{collectionName}" 
          </Typography>
      <Box mt={3}>
      <Button onClick={CreateNewItem}  variant="outlined">{t('Buttons.CreateItem')}</Button>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        />
    </div>

      
    </Container>
  );
}
