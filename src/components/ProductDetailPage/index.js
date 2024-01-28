import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ApiService from "../../services/apiService";

const ProductDetailPage = () => {
  const { prodId } = useParams();
  const [error, setError] = useState();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ApiService.getProduct(prodId)
      .then((response) => setProduct(response.data))
      .catch((err) => {
        const { msg } = err.response.data;

        if (msg) {
          return setError(msg);
        } else {
          setError(err.response.statusText);
        }
      });
  }, []);

  if (error) return <h1>{error}</h1>;
  if (!product) return <h1>Loading</h1>;
  return (
    <div>
      <h1>{product.title}</h1>
      <h2>{product.price}</h2>
      <p>{product.description}</p>
      <img
        src={product.imageUrl}
        style={{ width: "200px", height: "200px" }}
        alt="product"
      />
    </div>
  );
};

export default ProductDetailPage;
