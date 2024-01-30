import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./productDetailPage.css";
import ApiService from "../../services/apiService";
import { AuthContext } from "../../context/AuthContext";
import ProductDetailSideBar from "../ProductDetailSideBar";
import Spinner from "../Spinner";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { prodId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainPic, setMainPic] = useState("");

  const addToCart = () => {
    if (!auth.token) return navigate("/login");
    ApiService.addToCart(prodId)
      .then(alert("Product Added"))
      .catch((err) => alert("Couldnt add product"));
  };

  const deleteFromDb = () => {
    ApiService.deleteProductFromDb(prodId)
      .then(() => {
        alert("Product Deleted");
        navigate("/");
      })
      .catch((err) => alert("Couldnt Delete Item"));
  };

  useEffect(() => {
    ApiService.getProduct(prodId)
      .then((response) => setProduct(response.data))
      .catch((err) => navigate("/404"));
  }, [navigate, prodId]);

  if (!product) return <Spinner />;
  return (
    <div className="product-detail">
      <ProductDetailSideBar
        imageUrl={product.imageUrl}
        setMainPic={setMainPic}
      />
      <img
        src={mainPic || product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h1 className="product-name">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button className="add-to-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        {auth.isAdmin && (
          <button className="remove-product-db" onClick={deleteFromDb}>
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
