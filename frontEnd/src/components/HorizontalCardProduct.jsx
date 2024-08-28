/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { fetchCategoryWiseProduct } from "../Helper/fetchCategoryWiseProduct";
import displayINRCurrency from "../Helper/DisplayCurrency";
import { Link } from 'react-router-dom';
import addToCart from "../Helper/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null); // Adjust the number based on your design

  const {fetchUserAddToCart} =useContext(Context)

  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart();
  }
  const fetchData = async () => {
    setLoading(true);
    try {
      const categoryProduct = await fetchCategoryWiseProduct(category);
      setData(categoryProduct.data);
      
    } catch (error) {
      console.error("Error fetching data from HorizontalCardProduct:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
   
  }, [category]); // added category as dependency to re-fetch when it changes

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-3xl font-semibold my-4">{heading}</h2>
      <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none">
        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
              >
                <div className="bg-slate-200 h-full w-[120px] md:w-[145px] animate-pulse">
                  {/* Placeholder for image */}
                </div>
                <div className="flex-1 p-4">
                  <div className="h-4 bg-gray-200 mb-2 rounded-sm"></div> {/* Placeholder for title */}
                  <div className="h-3 bg-gray-200 mb-1 rounded-sm"></div> {/* Placeholder for category */}
                  <div className="flex gap-3 mt-2">
                    <div className="h-4 bg-gray-200 w-1/2 rounded-sm"></div> {/* Placeholder for price */}
                    <div className="h-4 bg-gray-200 w-1/2 rounded-sm"></div> {/* Placeholder for price */}
                  </div>
                  <div className="mt-auto">
                    <div className="h-8 bg-red-600 w-1/2 rounded-full animate-pulse"></div> {/* Placeholder for button */}
                  </div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link to={"/product/" + product?._id}
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px] border border-black rounded-lg max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow-md flex"
              >
                <div className="bg-slate-200 rounded-l-lg h-full w-[120px] md:w-[145px]">
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className="object-contain mix-blend-multiply w-full h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h2 className="font-medium text-base md:text-lg truncate">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product.category}</p>
                  <div className="flex gap-3">
                    <p className="font-medium ">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-200 line-through">
                      {displayINRCurrency(product.price)}
                    </p>
                  </div>
                  <button className=" text-sm border-2 border-black text-black hover:bg-yellow-400 px-3 py-0.5 rounded-lg" onClick={(e)=> {e.preventDefault();  handleAddToCart(e, product?._id)}}>
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
