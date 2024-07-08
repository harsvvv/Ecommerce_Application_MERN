/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../Helper/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../Helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

const AdminEditProduct = ({ onclose, productData ,fetchData}) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  useEffect(() => {
    if (productData) {
      setData({
        ...productData,
        productName: productData.productName,
        brandName: productData.brandName,
        category: productData.category,
        productImage: productData.productImage || [],
        description: productData.description,
        price: productData.price,
        sellingPrice: productData.sellingPrice,
      });
    }
  }, [productData]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/update-product", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onclose();
      fetchData()
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 bottom-0 top-0 left-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload</h2>
          <div className="w-fit ml-auto cursor-pointer text-lg hover:text-red-600">
            <IoMdClose onClick={onclose} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="grid p-4 pb-20 gap-3 overflow-y-scroll h-full">
          <label htmlFor="productName">Edit Product Name:</label>
          <input
            required
            type="text"
            id="productName"
            placeholder="Enter product name"
            value={data.productName}
            name="productName"
            onChange={handleOnChange}
            className="p-2 border bg-slate-100 outline-none rounded-sm"
          />
          <label htmlFor="brandName">Edit Brand Name:</label>
          <input
            required
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 border bg-slate-100 outline-none rounded-sm"
          />
          <label htmlFor="category">Edit Category :</label>
          <select
            required
            className="border outline-none p-2 bg-slate-100"
            value={data.category}
            name="category"
            onChange={handleOnChange}
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>
          <label htmlFor="productImage">Edit Product Image :</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border flex justify-center items-center rounded h-32 w-full">
              <div className="text-slate-500 flex justify-end items-center flex-col">
                <span className="text-3xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload product image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data.productImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setFullScreenImage(el);
                        setOpenFullScreenImage(true);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 cursor-pointer p-1 text-white bg-red-500 rounded-full hidden group-hover:block"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Please upload product image</p>
            )}
          </div>
          <label htmlFor="price">Price :</label>
          <input
            required
            type="number"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 border bg-slate-100 outline-none rounded-sm"
          />
          <label htmlFor="sellingPrice">Selling Price :</label>
          <input
            required
            type="number"
            id="sellingPrice"
            placeholder="Enter selling Price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 border bg-slate-100 outline-none rounded-sm"
          />
          <label htmlFor="description">Description :</label>
          <textarea
            onChange={handleOnChange}
            name="description"
            value={data.description}
            id="description"
            className="h-28 p-1 bg-slate-100 border resize-none"
            placeholder="Enter product Description"
            rows={3}
          ></textarea>
          <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-2 mb-3">
            Update product
          </button>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
}

export default AdminEditProduct;
