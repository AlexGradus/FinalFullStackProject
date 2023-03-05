import * as React from 'react';
import { s } from '.';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {  Autocomplete, CardContent, Input, TextField } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import { pushTags } from '../../api/api';
import { useTranslation } from 'react-i18next';


const EditItem = (props: any) => {
  const { t } = useTranslation();
  const [tagsForAutocomplete, setTagsForAutocomplete] = useState([]);
  const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
  const currentUser = useSelector((state:MyState)=>state.app.currentUser.email);
  useEffect(() => {
    setName(props.data?props.data.item.itemName:'')
    setTags(props.data?props.data.item.tags:'')
    setMarkDownValueDescription(props.data?props.data.item.description:'')
    setMarkDownValueComments(props.data?props.data.item.comments:'')
    setMarkDownValueNotes(props.data?props.data.item.notes:'')
    setId(props.data?props.data.item.id:'')
    setMadeIn(props.data?props.data.item.madeIn:'')
    setDamage(props.data?props.data.item.damage:'')
    setCondition(props.data?props.data.item.condition:'')
    setValueAmount(props.data?props.data.item.amount:'')
    setValueSail(props.data?props.data.item.readyToSail:'')
    setValueCost(props.data?props.data.item.cost:'')
    setForSale(props.data?props.data.item.forSale:'')
    setForeign(props.data?props.data.item.foreign:'')
    setStock(props.data?props.data.item.inStock:'')
    setValueBought(props.data?props.data.item.bought:'')
    setValueRegistration(props.data?props.data.item.firstRegistration:'')
    setValueCreated(props.data?props.data.item.created:'')
  },[props]);

  const [markDownValueDescription,setMarkDownValueDescription] = useState('' as string | undefined);
  const [markDownValueComments,setMarkDownValueComments] = useState('' as string | undefined);
  const [markDownValueNotes,setMarkDownValueNotes] = useState('' as string | undefined);
  const [id, setId] = useState('');
  const [name, setName] = useState(''); 
  const [tags, setTags] = useState(''); 
  const [madeIn, setMadeIn] = useState(''); 
  const [damage, setDamage] = useState(''); 
  const [condition, setCondition] = useState(''); 
  const [valueAmount, setValueAmount] = useState<number | string | Array<number | string>>(
    5,
  );
  const [valueSail, setValueSail] = useState<number | string | Array<number | string>>(
    50,
  );
  const [valueCost, setValueCost] = useState<number | string | Array<number | string>>(
    30,
  );
  const [forSale, setForSale] = useState(false); 
  const [foreign, setForeign] = useState(true); 
  const [stock, setStock] = useState(false); 
  const [valueBought, setValueBought] = useState<Dayjs | null>(
    dayjs(Date.now()),
  );
  const [valueRegistration, setValueRegistration] = useState<Dayjs | null>(
    dayjs(Date.now()),
  );
  const [valueCreated, setValueCreated] = useState<Dayjs | null>(
    dayjs(Date.now()),
  );

  const ChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const ChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const ChangeTags= (event: ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };
  const ChangeMadeIn = (event: ChangeEvent<HTMLInputElement>) => {
    setMadeIn(event.target.value);
  };
  const ChangeDamage = (event: ChangeEvent<HTMLInputElement>) => {
    setDamage(event.target.value);
  };
  const ChangeCondition = (event: ChangeEvent<HTMLInputElement>) => {
    setCondition(event.target.value);
  };



  const handleSliderChangeAmount = (event: Event, newValue: number | number[]) => {
    setValueAmount(newValue);
  };

  const handleInputChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlurAmount = () => {
    if (valueAmount < 0) {
      setValueAmount(0);
    } else if (valueAmount > 100) {
      setValueAmount(100);
    }}


  
    const handleSliderChangeSail = (event: Event, newValue: number | number[]) => {
      setValueSail(newValue);
    };
  
    const handleInputChangeSail = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueSail(event.target.value === '' ? '' : Number(event.target.value));
    };
  
    const handleBlurSail = () => {
      if (valueAmount < 0) {
        setValueSail(0);
      } else if (valueAmount > 100) {
        setValueSail(100);
      }}

    const handleSliderChangeCost = (event: Event, newValue: number | number[]) => {
      setValueCost(newValue);
    };
  
    const handleInputChangeCost = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueCost(event.target.value === '' ? '' : Number(event.target.value));
    };
  
    const handleBlurCost = () => {
      if (valueAmount < 0) {
        setValueCost(0);
      } else if (valueAmount > 100) {
        setValueCost(100);
      }}

      const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
          borderRadius: 22 / 2,
          '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
          },
          '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
          },
          '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
              theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
          },
        },
        '& .MuiSwitch-thumb': {
          boxShadow: 'none',
          width: 16,
          height: 16,
          margin: 2,
        },
      }));
      const checkForSale = (event: boolean | ((prevState: boolean) => boolean)) => {
       
        setForSale(event);
      };
      const checkForeign = (event: boolean | ((prevState: boolean) => boolean)) => {
       
        setForeign(event);
      };
     
      const checkStock = (event: boolean | ((prevState: boolean) => boolean)) => {
       
        setStock(event);
      };

     
    
      const handleChangeCreated = (newValue: Dayjs | null) => {
        setValueCreated(newValue);
      };
   
    
      const handleChangeBought = (newValue: Dayjs | null) => {
        setValueBought(newValue);
      };
      
    
      const handleChangeRegistration = (newValue: Dayjs | null) => {
        setValueRegistration(newValue);
      };




const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const editItem = async( email: string,
        collectionName: string, itemName: string,
        id: string,madeIn:string, condition: string,damage: string,
        comments: string | undefined,description: string | undefined, notes: string | undefined,
        forSale: Boolean,foreign: Boolean,inStock: Boolean,
        created: Dayjs | null,bought: Dayjs | null,firstRegistration: Dayjs | null,amount: string | number | (string | number)[],
        readyToSail: string | number | (string | number)[],cost: string | number | (string | number)[],originalId:string,tags:string)=>{
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
              userComment:'',
              tags
            })
            
        } catch(e){
          if (axios.isAxiosError(e))  {
            alert(e.response?.data.message );
          } 
        }
       
      }
      const getTags = async(name:string)=>{
        try{
          await axios.post("http://localhost:5000/api/auth/gettags",{
              name
            }).then(res => {
              setTagsForAutocomplete(res.data.tags.tags)
            })
            
        } catch(e){
          if (axios.isAxiosError(e))  {
            console.log(e.response?.data.message );
          } 
        }
       }
       useEffect(() => {
        getTags('282')
      },[tags]);
      return(
        <div >
      <Button  onClick={()=>handleClickOpen()} startIcon={<EditOutlinedIcon />}>

      </Button>
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {t('Item.EditItem')} 
        </DialogTitle>
        <DialogContent >
        <Card  >
    <CardContent className= {s.box} >
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
       <TextField 
      id="outlined-basic" 
      label="Id" 
      variant="outlined"
      value={id}
      onChange={ChangeId}
     />
      <TextField 
      id="outlined-basic" 
      label="Name" 
      variant="outlined"
      value={name}
      onChange={ChangeName}
     />
     
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={tagsForAutocomplete.map((option) => option)}
        onChange={(event, newValue) => {
          setTags(newValue as string);
        }}
        
        renderInput={(params) => <TextField value={tags} onChange={ChangeTags} {...params} label={t('Item.Tags')}   />}
      />
      {props.data?props.data.fieldsLocation[0]? <TextField 
      id="outlined-basic" 
      label={t('Item.MadeIn')}
      variant="outlined"
      value={madeIn}
      onChange={ChangeMadeIn}
     /> : <></>:'' }
     {props.data?props.data.fieldsLocation[1]?<><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
     {t('Item.Description')}
          </Typography>
          <MDEditor
              value={markDownValueDescription}
              onChange={setMarkDownValueDescription} /></> : <></>:''  }
    
     {props.data?props.data.fieldsLocation[3]? <TextField 
      id="outlined-basic" 
      label={t('Item.Damage')} 
      variant="outlined"
      value={damage}
      onChange={ChangeDamage}
     /> : <></>:'' }
     {props.data?props.data.fieldsLocation[4]? <TextField 
      id="outlined-basic" 
      label={t('Item.Condition')}
      variant="outlined"
      value={condition}
      onChange={ChangeCondition}
     /> : <></>:''  }
     {props.data?props.data.fieldsLocation[5]?<><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
     {t('Item.Notes')}
          </Typography><MDEditor
              value={markDownValueNotes}
              onChange={setMarkDownValueNotes} /></> : <></>:'' }
              
      </Box>
      {props.data?props.data.fieldsLocation[12]? <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
      {t('Item.Amount')}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof valueAmount === 'number' ? valueAmount : 0}
            onChange={handleSliderChangeAmount}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={valueAmount}
            size="small"
            onChange={handleInputChangeAmount}
            onBlur={handleBlurAmount}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>: <></>:''  }
    {props.data?props.data.fieldsLocation[13]? <Box sx={{ width: 250 }}>
   <Typography id="input-slider" gutterBottom>
      {t('Item.ReadyToSail')}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof valueSail === 'number' ? valueSail : 0}
            onChange={handleSliderChangeSail}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={valueSail}
            size="small"
            onChange={handleInputChangeSail}
            onBlur={handleBlurSail}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box> : <></>:'' }
    {props.data?props.data.fieldsLocation[14]?<Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
      {t('Item.Cost')}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof valueCost === 'number' ? valueCost : 0}
            onChange={handleSliderChangeCost}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={valueCost}
            size="small"
            onChange={handleInputChangeCost}
            onBlur={handleBlurCost}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>: <></>:'' }
    {props.data?props.data.fieldsLocation[6]? <Box>
    <FormControlLabel
        control={<Android12Switch checked={forSale} />}
        label={t('Item.ForSale')}
        onChange={(event, newValue) => {checkForSale(newValue)}}
      />
    </Box>: <></>:'' }
    {props.data?props.data.fieldsLocation[7]?<Box>
    <FormControlLabel
        control={<Android12Switch checked={foreign} />}
        label={t('Item.Foreign')}
        onChange={(event, newValue) => {checkForeign(newValue)}}
      />
    </Box>: <></>:'' }
    {props.data?props.data.fieldsLocation[8]? <Box>
    <FormControlLabel
        control={<Android12Switch checked={stock} />}
        label={t('Item.InStock')}
        onChange={(event, newValue) => {checkStock(newValue)}}
      />
    </Box>: <></>:'' }
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    {props.data?props.data.fieldsLocation[9]? <Box mt={2}>
      <MobileDatePicker
          label={t('Item.Created')}
          inputFormat="MM/DD/YYYY"
          value={valueCreated}
          onChange={handleChangeCreated}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>:<></>:'' }

      {props.data?props.data.fieldsLocation[10]?<Box mt={2}>
        <MobileDatePicker
          label={t('Item.Bought')}
          inputFormat="MM/DD/YYYY"
          value={valueBought}
          onChange={handleChangeBought}
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>:<></>:'' }
        {props.data?props.data.fieldsLocation[11]? <Box mt={2}>
        <MobileDatePicker
          label={t('Item.FirstRegistration')}
          inputFormat="MM/DD/YYYY"
          value={valueRegistration}
          onChange={handleChangeRegistration}
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>:<></>:'' }
   
       
        
    </LocalizationProvider>
   

    
    
     

    <Button
              type="submit"
             
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=> 
               { editItem(currentUser,
                  collectionName,
                  name,
                  id,
                  madeIn,
                  condition,
                  damage,
                  markDownValueComments,
                  markDownValueDescription,
                  markDownValueNotes,
                  forSale,
                  foreign,
                  stock,
                  valueCreated,
                  valueBought,
                  valueRegistration,
                  valueAmount,
                  valueSail,
                  valueCost,
                  props.data.item.id,
                  tags
                  )
                  
                  localStorage.setItem("ItemId", JSON.stringify(id));
                  pushTags('282',String(tags))
                }
                }
            >
              {t('Item.EditItem')}
          </Button>
          <Button onClick={()=>{
            handleClose();
            props.getCurrentItem(currentUser,collectionName,id);
            }} autoFocus>
          {t('Buttons.Close')}
          </Button>
        
     
    </CardContent>

  </Card>
        </DialogContent>
        <DialogActions>
        
        </DialogActions>
      </Dialog>
    </div>
      )
  };
  export default EditItem;
