import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {  TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MDEditor from '@uiw/react-md-editor';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useTranslation } from 'react-i18next';



const CustomDialog = (props:any) => {
  const { t } = useTranslation();
  const fields = ['Made In','Description','Comments','Damage','Condition','Notes','For Sale','Foreign','In Stock','Created','Bought','First Registration','Amount','Ready To Sail','Cost'];
  const [checked, setChecked] = React.useState(props.fieldsLocation);
  const additionalFieldsCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const used=checked.map((item:boolean)=>item=event.target.checked)
    setChecked(used);
  };
  const additionalFieldsCheck = (event: React.ChangeEvent<HTMLInputElement>,index:number) => {
    const used=checked.map((item:boolean,i:number)=>i===index?item=event.target.checked:item)
    setChecked(used);
  };
  const [markDownValue, setMarkDownValue] = useState(props.collectionMarkDownValue);
  const [type, setType] = useState(props.collectionType);
  const [name, setName] = useState(props.collectionName);
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  const ChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
        setOpen(true);
      };
  const handleClose = () => {
        setOpen(false);
      };
      const editCollection = async(email:string, index: number, collectionName: string, collectionType: string, collectionMarkDownValue: string,addedFields: string[],fieldsLocation:boolean[],collectionImage: any)=>{
        try{
             await axios.post("http://localhost:5000/api/auth/editcollection",{
              email,
              index,
              collectionName,
              collectionType,
              collectionMarkDownValue,
              addedFields,
              fieldsLocation,
              collectionImage
            })
            
        } catch(e){
          if (axios.isAxiosError(e))  {
            alert(e.response?.data.message );
          } 
        }
       
      }

   return(
        <div key={props.index} >
        
      <Button  onClick={()=>handleClickOpen()} startIcon={<EditOutlinedIcon />}>

      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {t('NewCollection.Edit')} 
        </DialogTitle>
        <DialogContent>
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
      label={t('NewCollection.Name')} 
      variant="outlined"
      value={name}
      onChange={ChangeName}
     />
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          value={type}
          onChange={handleChange}
          label={t('NewCollection.Type')} 
        >
          <MenuItem value={"Alcogol"}>Alcogol</MenuItem>
          <MenuItem value={"Cigaretes"}>Cigaretes</MenuItem>
          <MenuItem value={"Cars"}>Cars</MenuItem>
          <MenuItem value={"Books"}>Books</MenuItem>
        </Select>
      </Box>
      <Box>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {t('NewCollection.DescriptionMark')}:
      </Typography>
      <MDEditor
        value={markDownValue}
        onChange={setMarkDownValue}
      />
        
      </Box>
      <div>
      <Typography mt={2} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {t('NewCollection.AddFields')}
      </Typography> 
    <FormControlLabel
      label={t('NewCollection.AllFields')}
      control={
        <Checkbox
          checked={checked[0] && checked[1]}
          indeterminate={checked[0] !== checked[1]}
          onChange={additionalFieldsCheckAll}
        />
      }
    />
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
    {
          fields.map((item,index)=>{
           
            return <FormControlLabel key={index} label = { item } control={<Checkbox checked={checked[index]} onChange={e =>additionalFieldsCheck(e,index)} />}/>
          })
        }

    </Box>
  </div>
      
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={()=>{
        const addFields=[] as string[];
        fields.forEach((item,index)=>{
            if(checked[index]===true){
            addFields.push(item)
               }
                })
                editCollection(props.currentUser,props.index,name,type,markDownValue,addFields,checked,props.collectionImage)
      
              }}
            >
              {t('NewCollection.Edit')}
     </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{
            handleClose();
            props.getCollection(props.currentUser);
            }} autoFocus>
          {t('Buttons.Close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      )
  };
  export default CustomDialog;
