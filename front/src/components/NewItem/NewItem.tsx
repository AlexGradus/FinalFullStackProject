import * as React from 'react';
import { s } from '.';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Autocomplete, TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import FormControlLabel from '@mui/material/FormControlLabel';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { pushTags } from '../../api/api';
import { NavLink } from 'react-router-dom';
const Input = styled(MuiInput)`
  width: 42px;
`;

export default function NewItem() {
  
  const [tagsForAutocomplete, setTagsForAutocomplete] = useState([]);
  const [alertContent, setAlertContent] = useState('');
  const collectionName = JSON.parse( localStorage.getItem("CollectionName") as string );
  const collectionIndex = JSON.parse( localStorage.getItem("CollectionIndex") as string );
  const [addedFields,setAddedFields] = useState('');
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
  const [fieldsLocation,setFieldsLocation] = useState([]);
  const currentUser = useSelector((state:MyState)=>state.app.currentUser);
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

  const getCollection = async(email:string)=>{
    try{
        await axios.post("http://localhost:5000/api/auth/collections",{
          email
        }).then(res => {
          setFieldsLocation(res.data.collection.collections[collectionIndex].fieldsLocation
            );
          setAddedFields(res.data.collection.collections[collectionIndex].addedFields
            )
            
    
        })
       
    } catch(e){
      if (axios.isAxiosError(e))  {
        console.log(e.response?.data.message );
      } 
    }
   
  }
  
  useEffect(() => {
    getCollection(currentUser.email)
  },[]);
  useEffect(() => {
  getTags('282')
  },[tags]);
  
  const ChangeId = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const ChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const ChangeTags = (event: ChangeEvent<HTMLInputElement>) => {
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

      const checkForSale = (event: any) => {
       
        setForSale(event.target.checked);
      };
      const checkForeign = (event:  any) => {
       
        setForeign(event.target.checked);
      };
     
      const checkStock = (event:  any) => {
       
        setStock(event.target.checked);
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

      const createItem = async( email: string,
         collectionName: string, itemName: string,
         id: string,madeIn:string, condition: string,damage: string,
         comments: string | undefined,description: string | undefined, notes: string | undefined,
         forSale: Boolean,foreign: Boolean,inStock: Boolean,
         created: Dayjs | null,bought: Dayjs | null,firstRegistration: Dayjs | null,amount:string | number | (string | number)[],
         readyToSail: string | number | (string | number)[],cost: string | number | (string | number)[],addedFields:string,fieldsLocation:string[],tags:string)=>{
        try{
            const response = await axios.post("http://localhost:5000/api/auth/createitem",{
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
              addedFields,
              fieldsLocation,
              tags,
            })
            setAlertContent(response.data.message);
        } catch(e){
          if (axios.isAxiosError(e))  {
            setAlertContent(e.response?.data.message );
          } 
        }
       
      }
    
      const SendData = ()=>{
        createItem(currentUser.email,
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
          addedFields,
          fieldsLocation,
          tags
          );
          pushTags('282',tags)

      }
  

  return (
    <Card  className= {s.box}>
    <CardContent>
    <div className={s.button} ><NavLink className={s.back_button_position} to ="/myaccount/items/"><Button variant="outlined">BACK</Button></NavLink></div>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       New Item '{collectionName}'
      </Typography>
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
        
        renderInput={(params) => <TextField value={tags} onChange={ChangeTags} {...params} label="Tags(via ',')"  />}
      />
      {addedFields.includes('Made In')? <TextField 
      id="outlined-basic" 
      label="Made In" 
      variant="outlined"
      value={madeIn}
      onChange={ChangeMadeIn}
     /> : <></> }
     {addedFields.includes('Description')?<><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Description
          </Typography>
          <MDEditor
              value={markDownValueDescription}
              onChange={setMarkDownValueDescription} /></> : <></> }
     {addedFields.includes('Comments')?<><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Comments
          </Typography><MDEditor
              value={markDownValueComments}
              onChange={setMarkDownValueComments} /></> : <></> }
     {addedFields.includes('Damage')? <TextField 
      id="outlined-basic" 
      label="Damage" 
      variant="outlined"
      value={damage}
      onChange={ChangeDamage}
     /> : <></> }
     {addedFields.includes('Condition')? <TextField 
      id="outlined-basic" 
      label="Condition" 
      variant="outlined"
      value={condition}
      onChange={ChangeCondition}
     /> : <></> }
     {addedFields.includes('Notes')?<><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Notes
          </Typography><MDEditor
              value={markDownValueNotes}
              onChange={setMarkDownValueNotes} /></> : <></> }
              
      </Box>
      {addedFields.includes('Amount')? <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Amount
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
    </Box>: <></> }
    {addedFields.includes('Ready To Sail')? <Box sx={{ width: 250 }}>
   <Typography id="input-slider" gutterBottom>
        Ready to Sail($x100)
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
    </Box> : <></> }
    {addedFields.includes('Cost')?<Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Cost ($x100)
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
    </Box>: <></> }
    {addedFields.includes('For Sale')? <Box>
    <FormControlLabel
        control={<Android12Switch checked={forSale} />}
        label="For Sale"
        onChange={e =>checkForSale(e)}
      />
    </Box>: <></> }
    {addedFields.includes('Foreign')?<Box>
    <FormControlLabel
        control={<Android12Switch checked={foreign} />}
        label="Foreign"
        onChange={e =>checkForeign(e)}
      />
    </Box>: <></> }
    {addedFields.includes('In Stock')? <Box>
    <FormControlLabel
        control={<Android12Switch checked={stock} />}
        label="In Stock"
        onChange={e =>checkStock(e)}
      />
    </Box>: <></> }
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    {addedFields.includes('Created')? <Box mt={2}>
      <MobileDatePicker
          label="Created"
          inputFormat="MM/DD/YYYY"
          value={valueCreated}
          onChange={handleChangeCreated}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>:<></> }

      {addedFields.includes('Bought')?<Box mt={2}>
        <MobileDatePicker
          label="Bought"
          inputFormat="MM/DD/YYYY"
          value={valueBought}
          onChange={handleChangeBought}
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>:<></> }
        {addedFields.includes('First Registration')? <Box mt={2}>
        <MobileDatePicker
          label="First Registration"
          inputFormat="MM/DD/YYYY"
          value={valueRegistration}
          onChange={handleChangeRegistration}
          renderInput={(params) => <TextField {...params} />}
        />
        </Box>:<></> }
    </LocalizationProvider>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={SendData}
            >
              Create
          </Button>
          {alertContent? <Alert severity='info'>{alertContent}</Alert> : <></> }
     
    </CardContent>

  </Card>

  );
}



 
