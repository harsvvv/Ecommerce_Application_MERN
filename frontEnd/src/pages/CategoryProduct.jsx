/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import productCategory from '../Helper/productCategory';
import displayINRCurrency from '../Helper/DisplayCurrency';
import addToCart from '../Helper/addToCart';
import Context from '../context';
import { fetchCategoryWiseProduct } from '../Helper/fetchCategoryWiseProduct'; // Assuming the correct path to your fetch function

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { fetchUserAddToCart } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(params.categoryName || '');

    const fetchData = async () => {
        setLoading(true);
        try {
            const responseData = await fetchCategoryWiseProduct(params.categoryName);
            setData(responseData.data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [params.categoryName]);

    const handleAddToCart = async (e, id) => {
        e.preventDefault();
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const handleCategoryChange = (categoryName) => {
        setSelectedCategory(categoryName);
        navigate(`/product-category/${categoryName}`);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="hidden lg:grid grid-cols-[200px,1fr]">
                <div className="bg-white p-2 min-h-[100vh] overflow-y-scroll">
                    <div>
                        <h3 className="text-base uppercase text-slate-500 border-b pb-2 border-slate-300 font-medium">
                            Sort by
                        </h3>
                        <form className="text-sm flex-col gap-2 py-2">
                            <div className="flex items-center gap-3">
                                <input type="radio" name="sortBy" />
                                <label>Price- Low to High</label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="radio" name="sortBy" />
                                <label>Price- High to Low</label>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3 className="text-base uppercase text-slate-500 border-b pb-2 border-slate-300 font-medium">
                            Category
                        </h3>
                        <form className="text-sm flex-col gap-2 py-2">
                            {productCategory.map((category, index) => (
                                <div key={category.value + index} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="category"
                                        id={category.value}
                                        checked={selectedCategory === category.value}
                                        onChange={() => handleCategoryChange(category.value)}
                                    />
                                    <label htmlFor={category.value}>
                                        {category.label}
                                    </label>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>

                <div>
                    {params.categoryName && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                            {data.map((product, index) => (
                                <Link
                                    to={'/product/' + product._id}
                                    key={index}
                                    className="bg-white rounded-sm hover:scale-105 shadow-md cursor-pointer hover:shadow-lg transition-all"
                                >
                                    <div className="bg-gray-200 h-48 overflow-hidden">
                                        <img
                                            src={product.productImage[0]}
                                            alt={product.productName}
                                            className="object-contain mix-blend-multiply w-full h-full"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col justify-between">
                                        <div>
                                            <h2 className="font-medium text-base md:text-lg truncate">
                                                {product.productName}
                                            </h2>
                                            <p className="capitalize text-gray-500">{product.category}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <p className="font-medium text-gray-800">
                                                    {displayINRCurrency(product.sellingPrice)}
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
                                            onClick={(e) => handleAddToCart(e, product._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;
