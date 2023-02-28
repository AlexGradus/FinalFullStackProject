
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useEffect } from 'react';
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
import NewItem from './components/NewItem';
import CurrentItem from './pages/CurrentItemPage';
import AdminPage from './pages/AdminPage';
import CurrentItemforAll from './pages/CurrentItemPageForAll';

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
         <Route path='/collection/items/item' element={<CurrentItemforAll/>}/>
     </Routes>}
     {Auth&&
     <Routes>
           <Route path='/' element={<WelcomePage/>}/>
           <Route path='/adminpage' element={<AdminPage/>}/>
           <Route path='/myaccount' element={<MyAccountPage/>}/>
           <Route path='/myaccount/newcollection' element={<NewCollection/>}/>
           <Route path='/myaccount/items' element={<ItemPage/>}/>
           <Route path='/myaccount/items/item' element={<CurrentItem/>}/>
           <Route path='/myaccount/items/newitem' element={<NewItem/>}/>
           <Route path='/collection/items/item' element={<CurrentItemforAll/>}/>
           
           
     </Routes>}
     </ThemeProvider>
     
     
    
    
    </BrowserRouter>
   
  );
}

export default App;


