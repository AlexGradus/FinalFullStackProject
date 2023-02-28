import * as React from 'react';
import { s } from '.';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Container } from '@mui/system';
import MDEditor from '@uiw/react-md-editor';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import  ImagesForChoiseFull  from './data'
import Column from './Column';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NavLink } from 'react-router-dom';

export default function NewCollection() {
  const userEmail = useSelector((state:MyState)=>state.app.currentUser.email);
  const [alertContent, setAlertContent] = useState('');
  const [markDownValue, setMarkDownValue] = useState('' as string | undefined);
  const [ImagesForChoise,setImagesForChoise] = useState(ImagesForChoiseFull);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  const ChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onDragEnd =(result: DropResult) =>{
    const { destination, source, draggableId } = result;
    
    if(!destination){
      return;
    }

    if(
      destination.droppableId === source.droppableId&&
      destination.index === source.index
      ){
      return;
    }
    const start = (ImagesForChoise as any).columns[source.droppableId];
    const finish = (ImagesForChoise as any).columns[destination.droppableId];

    if(start.id ==='column-1'&&
       finish.id ==='column-2'&&
       ImagesForChoise.columns['column-2'].imagesId.length >=1){
      return
    }
    if(start === finish){

      const newImageId = Array.from(start.imagesId);
      newImageId.splice(source.index,1);
      newImageId.splice(destination.index, 0, draggableId);
      
      const newColumn = {
        ...start,
        imagesId: newImageId,
      }
      
   
      const newImagesForChoise = {
        ...ImagesForChoise,
        columns: {
            ...ImagesForChoise.columns,
            [newColumn.id]:newColumn,
        }
      }
      
      setImagesForChoise(newImagesForChoise);
      return;
    }
   const startImageId = Array.from(start.imagesId)
   startImageId.splice(source.index,1);
   const newStart = {
    ...start,
    imagesId: startImageId,

   }

   const finishImageId = Array.from(finish.imagesId);
   finishImageId.splice(destination.index, 0, draggableId);

   const newFinish = {
    ...finish,
    imagesId: finishImageId,

   }

   const newImagesForChoise = {
    ...ImagesForChoise,
    columns: {
        ...ImagesForChoise.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,

    }
  }
  setImagesForChoise(newImagesForChoise);
  }
  const createCollection = async( email: string, collectionName: string, collectionType: string, collectionMarkDownValue: string|undefined,addedFields: string[],fieldsLocation:boolean[],collectionImage: any)=>{
    try{
        const response = await axios.post("http://localhost:5000/api/auth/createcollection",{
          email,
          collectionName,
          collectionType,
          collectionMarkDownValue,
          addedFields,
          fieldsLocation,
          collectionImage
        })
        setAlertContent(response.data.message);
    } catch(e){
      if (axios.isAxiosError(e))  {
        setAlertContent(e.response?.data.message );
      } 
    }
   
  }
  const fields = ['Made In','Description','Comments','Damage','Condition','Notes','For Sale','Foreign','In Stock','Created','Bought','First Registration','Amount','Ready To Sail','Cost'];
  const [checked, setChecked] = React.useState([false, false,false, false,false, false,false, false,false, false,false, false,false, false,false]);

  const additionalFieldsCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const used=checked.map((item)=>item=event.target.checked)
    setChecked(used);
  };
  const additionalFieldsCheck = (event: React.ChangeEvent<HTMLInputElement>,index:number) => {
    const used=checked.map((item,i)=>i===index?item=event.target.checked:item)
    setChecked(used);
  };
  const SendData = ()=>{
    const addFields=[] as string[];
    fields.forEach((item,index)=>{
      if(checked[index]===true){
        addFields.push(item)
      }
    })

    createCollection(userEmail,name,type,markDownValue,addFields,checked,ImagesForChoise.columns['column-2'].imagesId.join())
    
    setMarkDownValue('');
    setType('');
    setName('');
    setImagesForChoise(ImagesForChoiseFull);
    const used=checked.map((item)=>item=false)
    setChecked(used);
  }
 return (
    <Card  className= {s.box}>
    <CardContent>
    <div className={s.button} ><NavLink className={s.back_button_position} to ="/myaccount"><Button variant="outlined">BACK</Button></NavLink></div>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       New Collection
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
      label="Name" 
      variant="outlined"
      value={name}
      onChange={ChangeName}
     />
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          value={type}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value={"Alcogol"}>Alcohol</MenuItem>
          <MenuItem value={"Cigaretes"}>Cigarette</MenuItem>
          <MenuItem value={"Cars"}>Cars</MenuItem>
          <MenuItem value={"Books"}>Books</MenuItem>
        </Select>
      </Box>
      <Box>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Description(Markdown):
      </Typography>
      <MDEditor
        value={markDownValue}
        onChange={setMarkDownValue}
      />
        
      </Box>
      <Box>
      <Typography mt={2} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Additional fields for Item
      </Typography>
    <FormControlLabel
      label="All"
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
  </Box>
    <Container>
          <DragDropContext
          onDragEnd={onDragEnd}>
            <Box className = {s.dragBox}>
        {
          ImagesForChoise.columnOrder.map((columnId)=>{
            const column = (ImagesForChoise as any).columns[columnId];
            const imagesRow = column.imagesId.map((image:any)=>(ImagesForChoise as any).images[image])
            return <Column key={column.id} column = { column } imagesRow= {imagesRow}/>
          })
        }
        </Box>
            </DragDropContext>
    </Container>
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



 
