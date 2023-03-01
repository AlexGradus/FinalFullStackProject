import { s } from './';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Grid, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';




const WelcomePage = () => {
  const { t } = useTranslation();
  const[searchText,setSearchText] = useState('');
  const[observingItem,setObservingItem] = useState([]);
  const[tags,setTags] = useState([]);
  const navigate = useNavigate();



  const searchItem = async(text:string)=>{
    try{
      await axios.post("http://localhost:5000/api/auth/findtext",{
          text
        }).then(res => {
          setObservingItem(res.data.involvedItems)
        })
        
    } catch(e){
      if (axios.isAxiosError(e))  {
        console.log(e.response?.data.message );
      } 
    }
   }
   const getTags = async(name:string)=>{
    try{
      await axios.post("http://localhost:5000/api/auth/gettags",{
          name
        }).then(res => {
          setTags(res.data.tags.tags)
        })
        
    } catch(e){
      if (axios.isAxiosError(e))  {
        console.log(e.response?.data.message );
      } 
    }
   }
 
  const search=(text:string)=>{
    searchItem(text)
   }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    getTags("282")
  },[]);

  return (
    <><Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: "0 auto", position: "relative", top: 50 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)} />
      <IconButton onClick={() => search(searchText)} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    <Container>
         <Box mt={4}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {tags.map((item: any,index:number) => {
                return <Grid key={index} item xs={6}>
                <Item>
                    <Container onClick={() => {
                         search(item)
                    } }>
                        <Typography mt={1} align='center' component="h6" variant="h6">
                        {t('WelcomePage.Tag')}: {item}
                        </Typography>
                    </Container>
                </Item>
              </Grid>;
            })}
          </Grid>
        </Box>
      </Container>
    <Container>
         <Box mt={4}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {observingItem.map((item: any,index) => {
                return <Grid key={index} item xs={6}>
                <Item>
                    <Container onClick={() => {
                         localStorage.setItem("ItemId", JSON.stringify(item.id));
                         localStorage.setItem("CollectionName", JSON.stringify(item.collectionName));
                         localStorage.setItem("EmailForItem", JSON.stringify(item.email));
                         navigate("/collection/items/item");
                    } }>
                        <Typography mt={1} align='center' component="h6" variant="h6">
                        {t('WelcomePage.Item')}: {item.itemName} 
                        </Typography>
                    </Container>
                </Item>
              </Grid>;
            })}
          </Grid>
        </Box>
      </Container></>
  );
};
export default WelcomePage;
