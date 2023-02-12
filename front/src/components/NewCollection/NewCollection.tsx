import * as React from 'react';
import { s } from '.';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Container } from '@mui/system';
import MDEditor from '@uiw/react-md-editor';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import  ImagesForChoiseFull  from './data'
import Column from './Column';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MyState } from '../../interface/interface';

// <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />



export default function NewCollection() {
  const userEmail = useSelector((state:MyState)=>state.app.currentUser.email);
  console.log(userEmail);
  
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

   

    const start = ImagesForChoise.columns[source.droppableId];
    const finish = ImagesForChoise.columns[destination.droppableId];

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
  const createCollection = async( email: string, collectionName: string, collectionType: string, collectionMarkDownValue: string,collectionImage: any)=>{
    try{
        const response = await axios.post("http://localhost:5000/api/auth/createcollection",{
          email,
          collectionName,
          collectionType,
          collectionMarkDownValue,
          collectionImage
        })
      console.log(response.data.message);
    } catch(e){
      if (axios.isAxiosError(e))  {
        alert(e.response?.data.message );
      } 
    }
   
  }

  const SendData = ()=>(
    createCollection(userEmail,name,type,markDownValue,...ImagesForChoise.columns['column-2'].imagesId)
  )


  return (
    <Card  className= {s.box}>
    <CardContent>
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
          <MenuItem value={"Alcogol"}>Alcogol</MenuItem>
          <MenuItem value={"Cigaretes"}>Cigaretes</MenuItem>
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
      
        <Container>
          <DragDropContext
          onDragEnd={onDragEnd}>
            <Box className = {s.dragBox}>
        {
          ImagesForChoise.columnOrder.map((columnId)=>{
            const column = ImagesForChoise.columns[columnId];
            const imagesRow = column.imagesId.map(image=>ImagesForChoise.images[image])
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
      

    
     
    </CardContent>

  </Card>

  );
}



 
