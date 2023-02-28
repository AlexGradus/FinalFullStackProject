import { s } from '.';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import { NavLink } from 'react-router-dom';
import { logout, setAdminData, setDarkMode, setUsedByAdmin, setUser } from '../../store/appReducer';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const auth = useSelector((state:MyState)=>state.app.isAuth);
  const admin = useSelector((state:MyState)=>state.app.usedByAdmin);
  const currentUser = useSelector((state:MyState)=>state.app);
  const navigate = useNavigate();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ChangeToMyAccount = ()=>{
    setAnchorEl(null);
    navigate("/myaccount");
  }
  const ChangeToAdminPage = ()=>{
    
    setAnchorEl(null);
    currentUser.currentUser.admin==='Admin'?navigate("/adminpage"):alert("you are not admin!")
  }
  const dispatch = useDispatch();
  const darkMode = useSelector((state:MyState)=>state.app.currentMode);
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
    <Box sx={{ flexGrow: 1 }}>
     
      <AppBar position="static">
        <Toolbar>
        <Box>
            <Typography align="center"  variant="body2" component="div">
            Dark:
          </Typography>
          <Switch
              checked={darkMode as unknown as boolean | undefined}
              onChange={()=>{
                dispatch(setDarkMode(!darkMode))
                localStorage.setItem("darkMode", JSON.stringify(!darkMode))
              }}
              inputProps={{ 'aria-label': 'controlled' }}
          />
          </Box>
        {!auth&&<div><NavLink className={s.button} to ="/login">Sign in</NavLink></div>}
        {!auth&& <div ><NavLink className={s.button} to ="/registration">Sign up</NavLink></div>}

        {auth&&<Typography className={s.button} onClick={()=>{
          dispatch(setUsedByAdmin(false))
          dispatch(setAdminData({email:'',password:'',name:''}))
          dispatch(logout())}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Log Out
          </Typography>}
       
        {admin&&<Typography className={s.button} onClick={()=>{
          (dispatch as any)(login(currentUser.adminData.email,currentUser.adminData.password,currentUser.adminData.name))
          dispatch(setUsedByAdmin(false))
          dispatch(setAdminData({email:'',password:'',name:''}))
        }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Return to Your Acc
          </Typography>}
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={ChangeToAdminPage}>Admin</MenuItem>
                <MenuItem onClick={ChangeToMyAccount}>My account</MenuItem>
              </Menu>
            </div>
          )}
          
     
       </Toolbar>
      </AppBar>
    </Box>
  );
}
