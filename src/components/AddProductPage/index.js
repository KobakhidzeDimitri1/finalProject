import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../../services/apiService";
import "./addProductPage.css";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [productInput, setProductInput] = useState({
    title: "",
    type: "",
    stars: "",
    reviewCount: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const updateInput = (e) => {
    const { value, name } = e.target;
    setProductInput((userInput) => ({ ...userInput, [name]: value }));
  };

  const addProduct = async () => {
    await ApiService.addProduct(productInput)
      .then((res) => {
        const id = res.data;
        navigate(`/products/${id}`);
      })
      .catch((err) => setError(err.response.data.msg));
  };

  return (
    <div className="form">
      {error && <span className="error-span">{error}</span>}
      <span>Title</span>
      <input name="title" value={productInput.title} onInput={updateInput} />
      <span>Price</span>
      <input
        type="number"
        name="price"
        value={productInput.price}
        onInput={updateInput}
      />
      <span>Type</span>
      <select value={productInput.type} onChange={updateInput} name="type">
        <option value="shirt">Shirt</option>
        <option value="trousers">Trousers</option>
        <option value="shorts">Shorts</option>
        <option value="shoes">Shoes</option>
      </select>
      <span>Stars Amount</span>
      <select value={productInput.stars} onChange={updateInput} name="stars">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <span>Reviews Amount</span>
      <input
        type="number"
        name="reviewCount"
        value={productInput.reviewCount}
        onInput={updateInput}
      />
      <span>Description</span>
      <textarea
        name="description"
        onInput={updateInput}
        value={productInput.description}
      ></textarea>
      <span>Image address (URL)</span>
      <input
        name="imageUrl"
        value={productInput.imageUrl}
        onChange={updateInput}
      />
      <button onClick={addProduct}>Add</button>
    </div>
  );
};

export default AddProductPage;
