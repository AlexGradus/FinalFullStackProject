import * as React from 'react';
import { s } from '.';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, TextField } from '@mui/material';
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

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


// <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />



export default function NewCollection() {
  

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
          {alertContent? <Alert severity='info'>{alertContent}</Alert> : <></> }

    
     
    </CardContent>

  </Card>

  );
}



 
