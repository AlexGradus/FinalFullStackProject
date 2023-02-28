
import styled from 'styled-components';
import Images from './Images';
import {  Droppable } from 'react-beautiful-dnd';
const Container = styled.div`
    margin:8px;
    width:200px;
    display:flex;
    flex-direction:column;
`;
const Title = styled.h3`
    padding:8px;
`;
const ImageList = styled.div`
    padding:8px;
    flex-grow:1;
    min-height:200px;
`;


export default function Column(props:any) {
    

  
  
  
    return (
        <Container>
            <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {provided=>(
                  <ImageList
                  ref = {provided.innerRef}
                  {...provided.droppableProps}
                  >
                  {props.imagesRow.map((image:any, index:number)=><Images key={image.id} image={image} index = {index}/>)}
                  {provided.placeholder}
              </ImageList>
                )}
           
            </Droppable>
            
            
        </Container>
       
     
  
    );
  }