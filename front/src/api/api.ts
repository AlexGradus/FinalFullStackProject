import axios from "axios";

export const deleteUser = async(checked:string)=>{
    try{
        const response = await axios.post("http://localhost:5000/api/auth/delete",{
          checked
        })
      console.log(response.data.message);
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
