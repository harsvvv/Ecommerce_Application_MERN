import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import displayINRCurrency from "../Helper/DisplayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(10).fill(null);
  
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/view-card-product", {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    setLoading(false);
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch("/api/update-cart-product", {
      method: "POST",
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1
      })
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart(); // Ensure this function call is correct
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch("/api/update-cart-product", {
        method: "POST",
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1
        })
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart(); // Ensure this function call is correct
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch("/api/delete-cart-product", {
      method: "POST",
      credentials: 'include',
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify({
        _id: id,
      })
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart(); // Ensure this function call is correct
    }
  };
  const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
  const totalPrice=data.reduce((previous,currentValue)=>previous +(currentValue.quantity*currentValue.productId.sellingPrice),0)
  return (
    <div className="container w-[90%] mx-auto">
      <div className="text-center font-lg py-2 my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data Available</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={index}
                className="w-full bg-slate-300 h-32 my-1 border border-slate-300 animate-pulse rounded"
              />
            ))
          ) : (
            data.map((product) => (
              <div
                key={product?._id}
                className="w-full bg-white h-32 my-1 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
              >
                <div className="w-32 h-32 bg-slate-200">
                  <img src={product.productId.productImage[0]} className="w-full h-full object-scale-down mix-blend-multiply" />
                </div>
                <div className="p-4 relative">
                  <div
                    className="absolute right-0 text-green-400 rounded-full p-2 hover:text-red-500 transition-all cursor-pointer"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete />
                  </div>
                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                    {product.productId.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product.productId.category}</p>
                  <div className="flex justify-between">
                  <p className="text-red-600 font-medium ">{displayINRCurrency(product.productId.sellingPrice)}</p>
                  <p className="text-slate-600 font-medium">
  {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
</p>

                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="hover:bg-red-600 hover:text-white flex justify-center transition-all items-center rounded border border-red-600 text-red-600 w-6 h-6" onClick={() => decreaseQty(product?._id, product.quantity)}>-</button>
                    <span>{product.quantity}</span>
                    <button className="flex justify-center hover:bg-red-600 hover:text-white transition-all items-center rounded border border-red-600 text-red-600 w-6 h-6" onClick={() => increaseQty(product?._id, product.quantity)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-slate-200">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex item-center justify-between px-4 gap-2">
              <p>Quantity</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex item-center justify-between px-4 gap-2">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
              <button className=" border border-black px-3 py-1 bg-white hover:bg-green-500 hover:text-white rounded outline-none mx-auto mt-2 w-full bottom-0">Payment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
