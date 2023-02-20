import axios from "axios";


export const getCollection = async(email:string)=>{
  try{
      const response = await axios.post("http://localhost:5000/api/auth/collections",{
        email
      })
    return response.data.message;
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
 
}


export const deleteCollection = async(email:string, index: number)=>{
  try{
      const response = await axios.post("http://localhost:5000/api/auth/deletecollection",{
        email,
        index
      })
      
      console.log(response.data.message)
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
 
}

export const blockUser = async(checked:string)=>{
  try{
      const response = await axios.post("http://localhost:5000/api/auth/block",{
        checked
      })
    console.log(response.data.message);
  } catch(e){
    if (axios.isAxiosError(e))  {
      alert(e.response?.data.message );
    } 
  }
 
}
export const unblockUser = async(checked:string)=>{
try{
    const response = await axios.post("http://localhost:5000/api/auth/unblock",{
      checked
    })
  console.log(response.data.message);
} catch(e){
  if (axios.isAxiosError(e))  {
    alert(e.response?.data.message );
  } 
}

}
