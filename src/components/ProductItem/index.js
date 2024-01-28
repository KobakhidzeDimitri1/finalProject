import { Link } from "react-router-dom";

import "./productItem.css";
import { GoStarFill } from "react-icons/go";
import { FaCartPlus } from "react-icons/fa";
import ApiService from "../../services/apiService";

const ProductItem = ({ productData }) => {
  const {
    _id: prodId,
    title,
    price,
    stars,
    reviewCount,
    imageUrl,
  } = productData;

  const addToCart = async () => {
    await ApiService.addToCart(productData._id);
  };

  const starsArray = [];
  for (let i = 0; i < stars; i++) {
    starsArray.push(<GoStarFill key={i} color="gold" className="star-icon" />);
  }
  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img className="card-image" src={imageUrl} alt="product" />
      </div>
      <h3 className="card-title">{title}</h3>
      <div className="card-review">
        {starsArray}
        <span>({reviewCount})</span>
      </div>
      <h3 className="card-price">${price}</h3>
      <div className="card-operations">
        <Link to={`/products/${prodId}`}>Details</Link>
        <div className="card-add-wrapper" onClick={addToCart}>
          <FaCartPlus className="card-add" />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
