
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const user = JSON.parse(localStorage.getItem('user'));
export const productcontext = createContext();

function GlobalProvider({ children }) {
  const [brand, setbrand] = useState([]);
  const [Men, setMen] = useState([]);
  const [Women, setwomen] = useState([]);
  const [product, setProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [productByIdLoad, setProductByIdLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setdata] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchproduc, setsearchproduct] = useState();
  const [users, setUsers] = useState([]);
  const [activ, setactiv] = useState()

  const navigate = useNavigate(); 




  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/product?type=men");
        setMen(response.data);
      } catch (error) {
        console.log("Fetch error:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchmenData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/product?brand:Woodland");
        setbrand(response.data);
      } catch (error) {
        console.log("Fetch error:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchmenData();
  }, []);

  useEffect(() => {
    async function featchwomen() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/product?type=women");
        setwomen(response.data);
      } catch (error) {
        console.log("Fetch error:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    featchwomen();
  }, []);

  const fetchProductById = async (id) => {
    setError(null);
    setProductByIdLoad(true);
    try {
      const response = await axios.get(`http://localhost:3000/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      setError("Failed to fetch product data.");
    } finally {
      setProductByIdLoad(false);
    }
  };

  // const addToCart = async (product) => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (!user) {
  //     alert("Please Login");
  //     navigate('/login'); // Use navigate
  //     return;
  //   }
  //   try {
  //     const response = await fetch(`http://localhost:3000/user/${user.id}`);
      
  //     const userData = await response.json();
  //     console.log(userData);
      
  //     if (!userData) {
  //       alert("User not found!");
  //       return;
  //     }
  //     const cartItems = userData.cart || [];
  //     const isAlreadyInCart = cartItems.some(item => item.id === product.id);
  //     if (!isAlreadyInCart) {
  //       const updatedCart = [...cartItems, { ...product, qty: 1 }];
  //       setCartItems(updatedCart);
  //       await fetch(`http://localhost:3000/user/${user.id}`, {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({ cart: updatedCart })
  //       });
  //       alert("One item added to cart");
  //     } else {
  //       alert("This item is already in the cart");
  //     }
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //     alert("Something went wrong!");
  //   }
  // };



  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert("Please Login");
      navigate('/login');
      return;
    }
  
    try {
      const response = await axios.get(`http://localhost:3000/user/${user.id}`);
      
      
      
      const userData = response.data;  

  
      if (!userData) {
        alert("User not found!");
        return;
      }
  
      const cartItems = userData.cart || [];
      const isAlreadyInCart = cartItems.some(item => item.id === product.id);
  
      if (!isAlreadyInCart) {
        const updatedCart = [...cartItems, { ...product, qty: 1 }];
        setCartItems(updatedCart);
  
        await axios.patch(`http://localhost:3000/user/${user.id}`, {
          cart: updatedCart
        });
  
        alert("One item added to cart");
      } else {
        alert("This item is already in the cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Something went wrong!");
    }
  };
  








///////////////////////axi///////////





  const updateCartInDatabase = async (updatedCart) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await fetch(`http://localhost:3000/user/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: updatedCart }),
      });
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const increaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    await updateCartInDatabase(updatedCart);
  };

  const decreaseQuantity = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    await updateCartInDatabase(updatedCart);
  };

  const removeItem = async (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    await updateCartInDatabase(updatedCart);
  };

  const fatchcart = () => {
    if (user) {
      fetch(`http://localhost:3000/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data.cart || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching cart data:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }
  useEffect(() => {
    fatchcart()
  }, []);


  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((res) => res.json())
      .then((data) => setsearchproduct(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);



  const handleLoginClick = () => {
    navigate(user ? '/profile' : '/login');
  };

  //////////////////// clear cart ///////////// 

  const clearcart = async () => {
    if (user) {
      try {
        await fetch(`http://localhost:3000/user/${user.id}`, {
          method: 'PUT', // Use PUT if updating
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ cart: [] }),
        
          
        });
        fatchcart()
        alert("Payment succesfull")

      } catch (error) {
        console.error('Error updating cart:', error);
      }
    };
  }

  ///////////////////////////// login /////////////////

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');

    // Fetch user data from the external source
    fetch('http://localhost:3000/user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  return (
    <productcontext.Provider
      value={{
        brand,
        Men,
        Women,
        loading,
        error,
        product,
        fetchProductById,
        productByIdLoad,
        addToCart,
        cartItems,
        totalPrice,
        searchproduc,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        user, login, logout,
        users, setUsers,
        activ, setactiv,
        clearcart,
      }}
    >
      {children}
    </productcontext.Provider>
  );
}

export default GlobalProvider;





