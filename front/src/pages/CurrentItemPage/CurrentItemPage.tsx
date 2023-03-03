import { s } from '.';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditItem from './EditItem';
import Comments from '../../components/Comments/Comments';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CurrentItem() {
  const { t } = useTranslation();
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
    setInterval(() => {
      getCurrentItem(userEmail,collectionName,itemId)
    }, 5000);
   }, []);

 
return (
  <Card sx={{ width: 275, margin: "0 auto" }}>
     <div className={s.button} ><NavLink className={s.back_button_position} to ="/myaccount/items/"><Button variant="outlined">{t('Buttons.Back')}</Button></NavLink></div>
  <CardContent>
  <div>
  {t('Item.Title')}: {currentItem?currentItem.item.itemName:''}
   </div>
   <div>
        Id: {currentItem?currentItem.item.id:''}
   </div>
   <div>
   {t('Item.Tags')} : {currentItem?currentItem.item.tags:''}
   </div>
   {currentItem?currentItem.fieldsLocation[0]? <Box>
   <div>
   {t('Item.MadeIn')} : {currentItem?currentItem.item.madeIn:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[1]? <Box>
   <div>
   {t('Item.Description')} : <MDEditor.Markdown source={currentItem?currentItem.item.description:''} style={{ whiteSpace: 'pre-wrap' }} />
   </div>
   </Box>: <></>:'' }
  
   {currentItem?currentItem.fieldsLocation[3]? <Box>
   <div>
   {t('Item.Damage')} : {currentItem?currentItem.item.damage:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[4]? <Box>
   <div>
   {t('Item.Condition')}: {currentItem?currentItem.item.condition:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[5]? <Box>
   <div>
   {t('Item.Notes')}: <MDEditor.Markdown source={currentItem?currentItem.item.notes:''} style={{ whiteSpace: 'pre-wrap' }} />
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[6]? <Box>
   <div>
   {t('Item.ForSale')}: {currentItem?`${currentItem.item.forSale}`:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[7]? <Box>
   <div>
   {t('Item.Foreign')}: {currentItem?`${currentItem.item.foreign}`:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[8]? <Box>
   <div>
   {t('Item.InStock')}: {currentItem?`${currentItem.item.inStock}`:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[9]? <Box>
   <div>
   {t('Item.Created')}: {currentItem?currentItem.item.created:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[10]? <Box>
   <div>
   {t('Item.Bought')}: {currentItem?currentItem.item.bought:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[11]? <Box>
   <div>
   {t('Item.FirstRegistration')}: {currentItem?currentItem.item.firstRegistration:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[12]? <Box>
   <div>
   {t('Item.Amount')}: {currentItem?currentItem.item.amount:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[13]? <Box>
   <div>
   {t('Item.ReadyToSail')}: {currentItem?currentItem.item.readyToSail:''} $
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[14]? <Box>
   <div>
   {t('Item.Cost')}: {currentItem?currentItem.item.cost:''} $
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[2]? <Box>
   <div>
   {t('Item.Comments')}:
   </div>
   { <Comments comments={currentItem.item.comments}/>}
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


