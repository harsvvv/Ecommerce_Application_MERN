/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { fetchCategoryWiseProduct } from '../Helper/fetchCategoryWiseProduct';
import displayINRCurrency from '../Helper/DisplayCurrency';
import { Link } from 'react-router-dom';
import addToCart from "../Helper/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const {fetchUserAddToCart} =useContext(Context)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
 

  const loadingList = new Array(12).fill(null); // Adjust the number of placeholders based on your grid configuration

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
      console.error('Error fetching data from verticalcardProduct:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserAddToCart();
  }, [category]); // Fetch data whenever category changes

  return (
    <div className='container mx-auto px-4 my-6'>
      <h2 className='text-3xl font-semibold my-4'>{heading}</h2>
      <div className='grid grid-cols-1.2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {loading
          ? loadingList.map((_, index) => (
              <div key={index} className='bg-white rounded-sm shadow-md'>
                <div className='bg-gray-200 h-48 animate-pulse'></div> {/* Placeholder for image */}
                <div className='p-4'>
                  <div className='h-4 bg-gray-200 mb-2 rounded-sm'></div> {/* Placeholder for title */}
                  <div className='h-3 bg-gray-200 mb-1 rounded-sm'></div> {/* Placeholder for category */}
                  <div className='flex gap-3 mt-2'>
                    <div className='h-4 bg-gray-200 w-1/2 rounded-sm'></div> {/* Placeholder for price */}
                    <div className='h-4 bg-gray-200 w-1/2 rounded-sm'></div> {/* Placeholder for price */}
                  </div>
                  <div className='mt-auto'>
                    <div className='h-8 bg-red-600 w-full rounded-full animate-pulse'></div> {/* Placeholder for button */}
                  </div>
                </div>
              </div>
            ))
          : data.map((product, index) => (
              <Link to={"product/"+product?._id} key={index} className='bg-white m-2 rounded-lg border-1 border-yellow-200 shadow-md cursor-pointer hover:scale-105 transition-transform'>
                <div className='bg-gray-200 rounded-t-lg h-48'>
                  <img
                    src={product?.productImage[0]}
                    alt={product?.productName}
                    className='object-contain mix-blend-multiply w-full h-full'
                  />
                </div>
                <div className='p-4 flex flex-col flex-1'>
                  <h2 className='font-medium text-base md:text-lg truncate'>{product?.productName}</h2>
                  <p className='capitalize text-gray-500'>{product.category}</p>
                  <div className='flex gap-3 mt-2'>
                    <p className='font-medium text-gray-800'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-gray-400 line-through'>{displayINRCurrency(product.price)}</p>
                  </div>
                  <button className=" text-sm border-2 border-black  text-neutral-600 px-3 py-0.5 rounded-lg" onClick={(e)=> {e.preventDefault();  handleAddToCart(e, product?._id)}}>
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
