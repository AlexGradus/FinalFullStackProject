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






export default function NewCollection() {

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };
  const ChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
 console.log(type);
 console.log(name);

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
        </Select>
        
        
        
        
        
        
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
      
    </Box>
    
     
    </CardContent>

  </Card>

  );
}



 
