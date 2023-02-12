import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
const Container = styled.div`
   
  
    padding:8px;
    margin-bottom:8px;
`;



export default function Images(props) {
    
  
  
    return (
       <Draggable draggableId={props.image.id} index={props.index}>
        {provided=>(
             <Container
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref = {provided.innerRef}
             >
             
             <img src= {props.image.content} alt='content' width='100px'/>
         </Container> 
        )}
        
       </Draggable>
       
     
  
    );
  }