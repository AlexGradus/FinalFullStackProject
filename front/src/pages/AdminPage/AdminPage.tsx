import { s } from '.';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import {  setAdminData, setUsedByAdmin, setUser } from "../../store/appReducer";
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function AdminPage() {
  const { t } = useTranslation();
 const [userList, setUserList] = useState([]);

  const getUsers = async()=>{
    try{
        await axios.get("http://localhost:5000/api/auth/users",{
          
        }).then(res => {
          setUserList(res.data.user)
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
const currentUsers = useSelector((state:MyState)=>state.app);
const adminEmail = useSelector((state:MyState)=>state.app.adminData.email);
const currentUser = useSelector((state:MyState)=>state.app.currentUser);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const blockUser = async(checked:string)=>{
  try{
    await axios.post("http://localhost:5000/api/auth/block",{
        checked
      })
      getUsers();
  } catch(e){
    if (axios.isAxiosError(e))  {
      console.log(e.response?.data.message );
    } 
  }
 
}
const adminUser = async(checked:string)=>{
  try{
    await axios.post("http://localhost:5000/api/auth/admin",{
        checked
      })
      getUsers();
  } catch(e){
    if (axios.isAxiosError(e))  {
      console.log(e.response?.data.message );
    } 
  }
 
}
const unBlockUser = async(checked:string)=>{
  try{
    await axios.post("http://localhost:5000/api/auth/unblock",{
        checked
      })
      getUsers();
  } catch(e){
    if (axios.isAxiosError(e))  {
      console.log(e.response?.data.message );
    } 
  }
 
}

const deleteUser = async(checked:string)=>{
  try{
    await axios.post("http://localhost:5000/api/auth/delete",{
        checked
      })
      getUsers();
  } catch(e){
    if (axios.isAxiosError(e))  {
      console.log(e.response?.data.message );
    } 
  }
 
}

const notAdminUser = async(checked:string)=>{
  try{
      await axios.post("http://localhost:5000/api/auth/notAdmin",{
        checked
      })
      getUsers();
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
  
  }

  const dispatch = useDispatch();

  const login = (email:string, password:string, name:string)=>{
    return async (dispatch: (arg0: { type: string }) => void) =>{
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login",{
                email,
                password,
                name 
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem("token",response.data.token)
        } catch(e){
          if (axios.isAxiosError(e))  {
            console.log(e.response?.data.message );
          } 
        }

    }
  }

 
return (
    <Container >
       <div className={s.button} ><NavLink className={s.back_button_position} to ="/"><Button variant="outlined">{t('Buttons.Back')}</Button></NavLink></div>
        <Typography mt={2} align='center' component="h5" variant="h5">
        {t('AdminPage.MyAcc')} :"{currentUser.name}"
          </Typography>
     
      <Box  mt={3}>
      <Grid container height={100} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {
          userList.map((user:any)=>{
            
            return <Grid key={user._id} item xs={6}>
            <Item  sx={{
                    '&:hover': {
                     cursor: 'pointer'
                               }
                        }}>
                          <Box className ={s.wrapper}>
                            <Box className={s.editBar}>
            <Button onClick={()=>{blockUser(user._id)}}  startIcon={<DoDisturbOnIcon />}/>
            <Button onClick={()=>{unBlockUser(user._id)}}  startIcon={<DoNotDisturbOffIcon />}/>
            <Button onClick={()=>{adminUser(user._id)}}  startIcon={<SupervisorAccountIcon/>}/>
            <Button onClick={()=>{notAdminUser(user._id)}}  startIcon={<AdminPanelSettingsIcon />}/>
            <Button onClick={()=>{deleteUser(user._id)}}  startIcon={<DeleteForeverOutlinedIcon/>}/>
            
           
            </Box>
            
       
              <Container onClick={()=>{
                (dispatch as any)(login(user.email,user.secretPass,user.name))
                dispatch(setUsedByAdmin(true))
                if(!adminEmail){
                  dispatch(setAdminData({email:currentUsers.currentUser.email,password:currentUsers.currentUser.secretPass,name:currentUsers.currentUser.name}))
                }
                
                } }>
 
             <Box className={s.text}>
             {t('AdminPage.Name')}: {user.name}
             </Box>
                 
            
              <Typography  mt={1} align='center' component="h6" variant="h6">
                 Email: {user.email}
               </Typography>
              <Box>
              <Typography mt={1} align='center' component="h6" variant="h6">
              {t('AdminPage.Blocked')}:{user.block}
               </Typography>
               <Typography mt={1} align='center' component="h6" variant="h6">
               {t('AdminPage.Admin')}:{user.isAdmin}
               </Typography>
       
              </Box>
              </Container>
                          </Box>
            
             
            </Item>
          </Grid>
          })
        }
      </Grid>
      </Box>
    </Container>
  );
}
