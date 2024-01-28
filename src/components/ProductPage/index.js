import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import "./productPage.css";
import ApiService from "../../services/apiService";
import ProductItem from "../ProductItem";

export const ProductPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState();
  const pageNumber = +searchParams.get("page") || 1;

  useEffect(() => {
    ApiService.getCategoryProducts(categoryName, pageNumber || 1)
      .then((res) => {
        const { products, lastPage } = res.data;
        setProducts(products);
        setLastPage(parseInt(lastPage));
      })
      .catch((err) => navigate("/404"));

    return () => window.scrollTo(0, 0);
  }, [pageNumber, categoryName, navigate]);

  return (
    <div className="product-page-container">
      <div className="product-wrapper">
        {products.map((product) => (
          <ProductItem key={product._id} productData={product} />
        ))}
      </div>
      <div className="page-changer">
        {pageNumber - 1 > 0 ? (
          <Link
            to={{
              pathname: `/category/${categoryName}`,
              search: `?page=${pageNumber - 1}`,
            }}
          >
            Prev
          </Link>
        ) : (
          <span>prev</span>
        )}
        {pageNumber + 1 <= lastPage ? (
          <Link
            to={{
              pathname: `/category/${categoryName}`,
              search: `?page=${pageNumber + 1}`,
            }}
          >
            Next
          </Link>
        ) : (
          <span>Next</span>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
