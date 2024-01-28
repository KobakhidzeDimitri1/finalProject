import React, { useState, useEffect } from "react";

import ApiService from "../services/apiService";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    ApiService.getCart().then((res) => setCart(res.data));
  }, []);

  const addProduct = async (prodId) => {
    ApiService.addToCart(prodId).then(() =>
      ApiService.getCart().then((res) => setCart(res.data))
    );
  };

  return (
    <AuthContext.Provider value={{ cart, setCart, addProduct }}>
      {children}
    </AuthContext.Provider>
  );
};
