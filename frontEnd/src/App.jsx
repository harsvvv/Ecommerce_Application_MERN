/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import Context from "./context";
import { setUserDetails } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const num = useSelector((state) => state.user.user);
  const [cartProductCount, setCartProductCount] = useState(0);
  
  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch('https://techtronics-y2b2.onrender.com/api/user-details', {
        method: 'GET',
        credentials: 'include'
      });

      if (!dataResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await dataResponse.json();

      if (data && data.user) {
        setUser(data.user);
        dispatch(setUserDetails(data.user));
      } else {
        throw new Error('User data not found in response');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch("https://techtronics-y2b2.onrender.com/api/countAddToCartProduct", {
        method: "GET",
        credentials: 'include'
      });

      if (!dataResponse.ok) {
        throw new Error('Failed to fetch cart product count');
      }

      const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data);
    } catch (error) {
      console.error('Error fetching cart product count:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart
      }}>
        <div className="flex flex-col min-h-screen">
          <Toaster position="top-center" reverseOrder={false} />
          <Header data={cartProductCount} />
          <main className="flex-grow min-h[calc(100vh-120px)] pt-16">
            <Outlet />
          </main>
          <Footer />
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
