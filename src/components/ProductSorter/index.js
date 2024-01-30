import "./productSorter.css";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export const ProductSorter = ({ queryParams, setQueryParams }) => {
  const [searchInput, setSearchInput] = useState(queryParams.prodName);

  return (
    <div className="product-sorter">
      <div className="name-input-warpper">
        <input
          className="search-input"
          value={searchInput}
          onInput={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("hello");
              setQueryParams((prev) => ({
                ...prev,
                prodName: `${searchInput}`,
                page: 1,
              }));
            }
          }}
        />
        <span
          className="search-icon-wrapper"
          onClick={() =>
            setQueryParams((prev) => ({
              ...prev,
              prodName: `${searchInput}`,
              page: 1,
            }))
          }
        >
          <IoSearch className="search-icon" />
        </span>
      </div>
      <span>Sort By</span>
      <select
        onChange={(e) =>
          setQueryParams((prev) => ({ ...prev, sortId: e.target.value }))
        }
        value={queryParams.sortId}
      >
        <option value="1">Price Desc.</option>
        <option value="2">Price Asc.</option>
      </select>
    </div>
  );
};

export default ProductSorter;
