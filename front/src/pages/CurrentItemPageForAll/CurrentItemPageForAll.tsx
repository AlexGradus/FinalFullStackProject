import { s } from '.';
import * as React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import Comments from '../../components/Comments/Comments';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function CurrentItemforAll() {
  const { t } = useTranslation();
  const userEmail = JSON.parse( localStorage.getItem("EmailForItem") as string );
  const itemId = JSON.parse( localStorage.getItem("ItemId") as string );
  const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
  const [usersLike, setUsersLike] = useState([]); 
  const currentUser = useSelector((state:MyState)=>state.app.currentUser.email as any);
  const [like, setLike] = useState(false);
  const [currentItem, setCurrentItem] = useState(null as any);
  const [markDownValueComments,setMarkDownValueComments] = useState('' as string | undefined);
  const Auth = useSelector((state:MyState)=>state.app.isAuth);

 
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
  const getLikes = async(email:string,collectionName:string,id: string)=>{
    try{
        await axios.post("http://localhost:5000/api/auth/getlikes",{
          email,collectionName,id
        }).then(res => {
          setUsersLike(res.data.likes.likes);
          setLike(res.data.likes.likes.includes(currentUser)?true:false)

          })
       
    } catch(e){
      if (axios.isAxiosError(e))  {
        console.log(e.response?.data.message );
      } 
    }
  }
  const pushLikes = async(email:string,collectionName:string,id: string,likes:string[])=>{
    try{
        await axios.post("http://localhost:5000/api/auth/likes",{
          email,collectionName,id,likes
        })
       
    } catch(e){
      if (axios.isAxiosError(e))  {
        console.log(e.response?.data.message );
      } 
    }
  }
  const checkLike=(value:boolean)=>{
    if(!usersLike.includes(currentUser as never)){
      usersLike.push(currentUser  as never);
      pushLikes(userEmail,collectionName,itemId,usersLike)
      setLike(value);
    }
    
   
   }
   useEffect(() => {
    getLikes(userEmail,collectionName,itemId)
    getCurrentItem(userEmail,collectionName,itemId)
  
   }, []);
    useEffect(() => {
    setInterval(() => {
      getCurrentItem(userEmail,collectionName,itemId)
    }, 5000);
   }, []);
 
 
 
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const commentItem = async( email: string,
     collectionName: string, itemName: string,
     id: string,madeIn:string, condition: string,damage: string,
     comments: string | undefined,description: string | undefined, notes: string | undefined,
     forSale: Boolean,foreign: Boolean,inStock: Boolean,
     created: Dayjs | null,bought: Dayjs | null,firstRegistration: Dayjs | null,amount: string | number | (string | number)[],
     readyToSail: string | number | (string | number)[],cost: string | number | (string | number)[],originalId:string,userComment:string | undefined,tags:string)=>{
     try{
          await axios.post("http://localhost:5000/api/auth/edititem",{
           email,
           collectionName,
           itemName,
           id,
           madeIn,
           condition,
           damage,
           comments,
           description,
           notes,
           forSale,
           foreign,
           inStock,
           created,
           bought,
           firstRegistration,
           amount,
           readyToSail,
           cost,
           originalId,
           userComment,
           tags
         })
         getCurrentItem(userEmail,collectionName,itemId)
     } catch(e){
       if (axios.isAxiosError(e))  {
         alert(e.response?.data.message );
       } 
     }
    
   }

   
 
return (
  <Card sx={{ width: 275, margin: "0 auto" }}>
  <CardContent>
  <div className={s.button} ><NavLink className={s.back_button_position} to ="/"><Button variant="outlined">{t('Buttons.Back')}</Button></NavLink></div>
  <div>
  {t('Item.Title')}: {currentItem?currentItem.item.itemName:''}
   </div>
   <div>
        Id: {currentItem?currentItem.item.id:''}
   </div>
   <div>
   {t('Item.Tags')}: {currentItem?currentItem.item.tags:''}
   </div>
   {currentItem?currentItem.fieldsLocation[0]? <Box>
   <div>
   {t('Item.MadeIn')}: {currentItem?currentItem.item.madeIn:''}
   </div>
   </Box>: <></>:'' }
   {currentItem?currentItem.fieldsLocation[1]? <Box>
   <div>
   {t('Item.Description')}: <MDEditor.Markdown source={currentItem?currentItem.item.description:''} style={{ whiteSpace: 'pre-wrap' }} />
   </div>
   </Box>: <></>:'' }
  
   {currentItem?currentItem.fieldsLocation[3]? <Box>
   <div>
   {t('Item.Damage')}: {currentItem?currentItem.item.damage:''}
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

   <div>
   {t('Item.Comments')}:
   </div>
   <Comments comments={currentItem?currentItem.item.comments:['']}/>

   
   {Auth&&<><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       {t('Item.YourComment')}:
               </Typography><MDEditor
                         value={markDownValueComments}
                         onChange={setMarkDownValueComments} />
                          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              onClick={()=> 
               { commentItem(userEmail,
                  collectionName,
                  currentItem?currentItem.item.itemName:'',
                  itemId,
                  currentItem?currentItem.item.madeIn:'',
                  currentItem?currentItem.item.condition:'',
                  currentItem?currentItem.item.damage:'',
                  currentItem?currentItem.item.comments:'',
                  currentItem?currentItem.item.description:'',
                  currentItem?currentItem.item.notes:'',
                  currentItem?currentItem.item.forSale:false,
                  currentItem?currentItem.item.foreign:false,
                  currentItem?currentItem.item.inStock:false,
                  currentItem?currentItem.item.created:'',
                  currentItem?currentItem.item.bought:'',
                  currentItem?currentItem.item.firstRegistration:'',
                  currentItem?currentItem.item.amount:'',
                  currentItem?currentItem.item.readyToSail:'',
                  currentItem?currentItem.item.cost:'',
                  itemId,
                  markDownValueComments,
                  currentItem?currentItem.item.tags:''
                  )
                  setMarkDownValueComments('')
                }
                }
             
            >
               {t('Buttons.Send')}
          </Button></>}
          {Auth&&<Box><Checkbox {...label} icon={<FavoriteBorder />} checked={like} checkedIcon={<Favorite />} onChange={(event, newValue) => {checkLike(newValue)}} />{usersLike.length}</Box>}
    
  </CardContent>
</Card>
 );
}
