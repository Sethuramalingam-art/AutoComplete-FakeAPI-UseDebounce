import React, { useEffect, useState } from "react";
import useDebounce from "../src/hooks/useDebounce";

const AutoComplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [products, setProducts] = useState([]);

  const debounceSearchText = useDebounce(inputValue, 1000);
  useEffect(() => {
    fetchList(debounceSearchText);
  }, [debounceSearchText]);

  const fetchList = async (value) => {
    // Placeholder for fetching suggestions based on inputValue
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${value}`
      );
      const data = await response.json();
      console.log(data);
      setProducts(data?.products || []);
      // Process and set suggestions here
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <span>Auto Complete</span>
      <div className="autoCpmplete-wrapper">
        <div className="search-wrapper">
          <input
            type="text"
            label="search"
            placeholder="Search.."
            onChange={handleChange}
          />
          <img className="closeIcon" alt="closeIcon" src="/close-x.svg" />
        </div>
        {inputValue.length > 0 && (
          <div className="listView">
            {products.map((product) => {
              return (
                <div className="listItem" key={product.id}>
                  {product.title}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
