/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from "../Helper/DisplayCurrency";
import addToCart from "../Helper/addToCart";
import Context from "../context";
const ProductDetail = () => {
  const {fetchUserAddToCart} =useContext(Context)
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [], // Ensure productImage is initialized as an array
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [activeImage,setActiveImage]=useState("")
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const params = useParams();
  console.log("product id", params.id);
 
  const fetchProductDetails = async () => {

    setLoading(true);
    const response = await fetch("/api/product-details", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    const dataResponse = await response.json();
    console.log("dataResponse", dataResponse);
    setData(dataResponse.data);
    setActiveImage(dataResponse.data.productImage[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);
  console.log("data", data);
  const handleMouseEnterProduct=(imageUrl)=>{
    setActiveImage(imageUrl);
  }
  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart();
  }
  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex  flex-col lg:flex-row-reverse gap-2 ">
          <div className=" relative h-[300px] w-[300px]  lg:h-96 lg:w-96 bg-slate-200">
            <img src={activeImage} className="h-full w-full object-scale-down mix-blend-multiply"/>
         
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 animate-pulse bg-slate-200 rounded"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data.productImage.map((imageUrl, index) => {
                  return (
                    <div
                      key={imageUrl}
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imageUrl}
                        className="w-full h-full cursor-pointer hover:scale-110 transition-all object-scale-down mix-blend-multiply"
                        onMouseEnter={()=>handleMouseEnterProduct(imageUrl)}
                        onClick={()=>handleMouseEnterProduct(imageUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
         <p className="capitalize text-black rounded text-center p-2 bg-yellow-600 max-w-24 ">{data.brandName}</p>
         <h2 className="capitalize text-2xl font-medium lg:text-4xl">{data?.productName}</h2>
       <p className="capitalize text-slate-500">{data.category}</p>
       <div className="flex text-red-600 items-center gap-1">
       <FaStar />
       <FaStar />
       <FaStar />
       <FaStar />
       <FaStarHalfAlt />
       </div>
       <div className="flex gap-2 text-2xl lg:text-3xl font-medium my-2 text-red-600">
        <p>{displayINRCurrency(data.sellingPrice)}</p>
        <p className="line-through text-slate-500">{displayINRCurrency(data.price)}</p>
       </div>
       <div className="flex items-center gap-3 ">
        <button className="border-2 border-yellow-500 hover:text-black border-red-600 rounded px-3 py-1 min-w-[100px]">buy</button>
        <button className="border-2 border-yellow-500 hover:text-black px-3 py-1 rounded min-w-[100px]" onClick={(e)=> {e.preventDefault();  handleAddToCart(e, data?._id)}}>Add to Cart</button>
        
       </div>
       <div>
        <p className="text-slate-600 font-medium my-1">Description</p>
        <p>{data.description}</p>
       </div>

        </div>
      </div>
      
    </div>
  );
};

export default ProductDetail;
