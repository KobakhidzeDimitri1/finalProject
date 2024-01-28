import { useEffect, useState } from "react";
import "./cartOverlay.css";

import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import ApiService from "../../services/apiService";
import CartOverlayProduct from "../CartOverlayProduct";

const CartOverlay = ({ setShowCartOverlay }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    ApiService.getCart().then((res) => setCart(res.data));
  }, []);

  return (
    <div className="cart-overlay">
      <span className="close-overlay" onClick={() => setShowCartOverlay(false)}>
        <RxCross1 className="overlay-close-icon" />
      </span>
      <span className="cart-page-span">
        <Link to="/cart">View Cart Page</Link>
      </span>
      <span>Total</span>
      <span className="cart-overlay-total">${cart.total}</span>
      <div className="cart-overlay-items">
        {cart.items.map((productInfo) => (
          <CartOverlayProduct
            key={productInfo._id}
            productInfo={productInfo}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
};

export default CartOverlay;
