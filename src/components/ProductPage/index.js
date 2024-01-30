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
  const [searchParams] = useSearchParams();
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [lastPage, setLastPage] = useState();
  const [queryParams, setQueryParams] = useState({
    page: +searchParams.get("page") || 1,
    sortId: +searchParams.get("sortId") || 1,
    prodName: searchParams.get("prodName") || "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    navigate(
      `/category/${categoryName}?page=${queryParams.page}&sortId=${queryParams.sortId}&prodName=${queryParams.prodName}`
    );
    ApiService.getCategoryProducts(
      categoryName,
      queryParams.page,
      queryParams.sortId,
      queryParams.prodName
    )
      .then((res) => {
        const { products, lastPage } = res.data;
        setProducts(products);
        setError("");
        setLastPage(parseInt(lastPage));
      })
      .catch((err) => setError("No Products Found"));

    return () => window.scrollTo(0, 0);
  }, [
    categoryName,
    queryParams.page,
    queryParams.sortId,
    queryParams.prodName,
    navigate,
  ]);

  if (!products.length && !error) return <Spinner />;
  return (
    <div className="product-page-container">
      <ProductSorter
        queryParams={queryParams}
        setQueryParams={setQueryParams}
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
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            categoryName={categoryName}
            lastPage={lastPage}
          />
        </>
      )}
    </div>
  );
};

export default ProductPage;
