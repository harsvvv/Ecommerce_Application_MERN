/* eslint-disable no-unused-vars */
export const fetchCategoryWiseProduct=async(category)=>{
const response=await fetch("https://techtronics-y2b2.onrender.com/api/category-product",{
    method:"POST",
    headers:{
        "content-type": "application/json"
    },
    body:JSON.stringify({
        category:category
    })

    
})
const dataResponse=await response.json()
return dataResponse;
}