import MDEditor from '@uiw/react-md-editor';



export default function Comments(props:any) {
  
  

  return (
    <div>
       {props.comments.map((item:string,index:number) => (
        <div key={index}>
          <MDEditor.Markdown source={item} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
        
     
    ))}
    </div>
   
   
  );
}