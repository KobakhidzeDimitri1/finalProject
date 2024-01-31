import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import "./productPage.css";
import ApiService from "../../services/apiService";
import ProductItem from "../ProductItem";
import PageChangerBar from "../PageChangerBar";
import ProductSorter from "../ProductSorter";
import Spinner from "../Spinner";

export const ProductPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState();
  const pageNumber = +searchParams.get("page") || 1;
  const sortId = +searchParams.get("sortId") || 1;
  const prodName = searchParams.get("prodName") || "";

  const [error, setError] = useState("");

  console.log(pageNumber);
  useEffect(() => {
    navigate(
      `/category/${categoryName}?page=${pageNumber}&sortId=${sortId}&prodName=${prodName}`
    );
    ApiService.getCategoryProducts(categoryName, pageNumber, sortId, prodName)
      .then((res) => {
        const { products, lastPage } = res.data;
        setProducts(products);
        setError("");
        setLastPage(parseInt(lastPage));
      })
      .catch((err) => setError("No Products Found"));

    return () => window.scrollTo(0, 0);
  }, [categoryName, pageNumber, sortId, prodName, navigate]);

  if (!products.length && !error) return <Spinner />;
  return (
    <div className="product-page-container">
      <ProductSorter
        sortId={sortId}
        page={pageNumber}
        prodName={prodName}
        setQueryParams={setSearchParams}
      />
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <div className="product-wrapper">
            {products.map((product) => (
              <ProductItem key={product._id} productData={product} />
            ))}
          </div>
          <PageChangerBar
            page={pageNumber}
            prodName={prodName}
            sortId={sortId}
            setQueryParams={setSearchParams}
            categoryName={categoryName}
            lastPage={lastPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductPage;
