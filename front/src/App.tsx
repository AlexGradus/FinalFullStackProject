
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authorization } from './action/user';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { MyState } from './interface/interface';
import Header from './pages/Header';
import WelcomePage from './pages/WelcomePage';
import MyAccountPage from './pages/MyAccountPage';
import NewCollection from './components/NewCollection';
import ItemPage from './pages/ItemPage';

function App() {
  const darkMode = useSelector((state:MyState)=>state.app.currentMode);
  const darkTheme = createTheme({
    palette: {
     mode: darkMode?'dark':'light',
    },
  });
  const Auth = useSelector((state:MyState)=>state.app.isAuth);
  const dispatch = useDispatch();
  useEffect(()=>{
  (dispatch as any)(Authorization());
  },[])
  return (
    
    <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
    <Header/>
  
     {!Auth&&
     <Routes>
         <Route path='/' element={<WelcomePage/>}/>
         <Route path='/login' element={<SignIn/>}/>
         <Route path='/registration' element={<SignUp/>}/>
     </Routes>}
     {Auth&&
     <Routes>
           <Route path='/myaccount' element={<MyAccountPage/>}/>
           <Route path='/myaccount/newcollection' element={<NewCollection/>}/>
           <Route path='/myaccount/items' element={<ItemPage/>}/>
     </Routes>}
     </ThemeProvider>
     
     
    
    
    </BrowserRouter>
   
  );
}

export default App;


