/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productCategory from '../Helper/productCategory';

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [loading, setLoading] = useState(false);
 const categoryLoading=new Array(13).fill(null);
    const fetchCategoryProduct = async () => {
        setLoading(true);
        const response = await fetch("/api/get-categoryProduct");
        const dataResponse = await response.json();
        setLoading(false);
        setCategoryProduct(dataResponse.data);
    };

    useEffect(() => {
        fetchCategoryProduct();
    }, []);

    return (
        <div className='container mx-auto p-4 cursor-pointer'>
            <div className='flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none'>
                {loading ? (
                    
                        categoryLoading.map((el,index)=>{
                              return(
                                <div key={index} className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden animate-pulse bg-slate-200'>

</div>
                              )
                        })
                    
           
                ) : (
                    categoryProduct.map((product, index) => (
                        <Link to={"/product-category/" + product?.category} key={product?.category+index}>
                            <div className='text-center'>
                                <div className='w-16 h-16 md:w-20 flex justify-center md:h-20 rounded-2xl border border-black overflow-hidden p-3 bg-white'>
                                    <img
                                        src={product?.productImage[0]}
                                        alt={product?.category}
                                        className='h-full object-fill mix-blend-multiply hover:scale-125 transition-all'
                                    />
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product.category}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default CategoryList;
