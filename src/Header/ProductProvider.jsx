import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

function ProductProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [showNav, setShowNav] = useState(true);
  const navigate = useNavigate();


  const addToCart = (product) => {
    setCart([...cart, product]);
  };


  const handleAddCart = () => {
    setShowNav(false);
    navigate("/Addtocart");
  };

  return (
    <Context.Provider value={{ cart, addToCart, handleAddCart }}>
      {children}
    </Context.Provider>
  );
}

export default ProductProvider;
