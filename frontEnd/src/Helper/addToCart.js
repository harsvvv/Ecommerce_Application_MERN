// /* eslint-disable no-unused-vars */
import {toast} from 'react-hot-toast'
const addToCart=async(e,id)=>{

e.preventDefault();

const response=await fetch("/api/addtocart",{
method:"POST",
credentials:'include',
headers:{
    "content-type":"application/json"
},
body:JSON.stringify({
    productId:id
}
   
)
})

const responseData=await response.json();

if(responseData.success){
    toast.success(responseData.message)
}else{
    toast.error(responseData.message);
}
return responseData;
}


export default addToCart;

