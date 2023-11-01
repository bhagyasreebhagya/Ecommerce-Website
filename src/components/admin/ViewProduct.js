import * as React from "react";
import { useSelector } from "react-redux";

export function ViewProduct() {
  const allProductData = useSelector((state) => state.allProducts.products);
  console.log(allProductData);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {allProductData.map((product, index) => (
          <li key={index}>
            <strong>Title: {product.title}</strong>
            <br />
            Price: {product.price}
            <br />
            Category: {product.category}
            <br />
            {/* You can display other product details here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
