/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import VerticalCardProduct from '../components/VerticalCardProduct';
import displayINRCurrency from '../Helper/DisplayCurrency';
import addToCart from '../Helper/addToCart';
import Context from '../context';

const SearchProduct = () => {
    const [data, setData] = useState([]);
    const { fetchUserAddToCart } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const query = useLocation();

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://techtronics-y2b2.onrender.com/api/search${query.search}`);
            const dataResponse = await response.json();
            setData(dataResponse.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProduct();
    }, [query]);

    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        await addToCart(e,id);
        fetchUserAddToCart();
    };

    return (
        <div className="container mx-auto p-4">
            {loading && <p className="text-lg text-center">Loading.....</p>}
            <p>Search Result: {data.length}</p>
            {data.length === 0 && !loading && (
                <p className="bg-white text-lg text-center p-4">No Data Found</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                {data.length !== 0 &&
                    data.map((product, index) => (
                        <Link
                            to={'/product/' + product?._id}
                            key={index}
                            className="bg-white rounded-sm hover:scale-105  shadow-md cursor-pointer hover:shadow-lg transition-all"
                        >
                            <div className="bg-gray-200 h-48 overflow-hidden">
                                <img
                                    src={product?.productImage[0]}
                                    alt={product?.productName}
                                    className='object-contain mix-blend-multiply w-full h-full'
                                />
                            </div>
                            <div className="p-4 flex flex-col justify-between">
                                <div>
                                    <h2 className="font-medium text-base md:text-lg truncate">
                                        {product?.productName}
                                    </h2>
                                    <p className="capitalize text-gray-500">{product.category}</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <p className="font-medium text-gray-800">
                                            {displayINRCurrency(product?.sellingPrice)}
                                        </p>
                                        {product.price && (
                                            <p className="text-gray-400 line-through">
                                                {displayINRCurrency(product.price)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    className="bg-red-600 text-sm hover:bg-red-700 text-white px-3 py-1 rounded-full mt-2"
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default SearchProduct;
