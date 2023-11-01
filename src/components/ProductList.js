import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

// import Notification from "./Notification";

const products = [
  { id: 1, name: "Product 1", price: 10, quantity: 1 },
  { id: 2, name: "Product 2", price: 20, quantity: 1 },
  { id: 3, name: "Product 3", price: 30, quantity: 1 },
];

const ProductList = () => {
  //const [notification, setNotification] = useState("");
  const dispatch = useDispatch();

  const handleAddToCart = (product, quantity) => {
    // Add the product to the cart logic
    // Show a notification
    // setNotification(`${product.item}`);

    // setNotification(
    //   `${quantity} ${quantity === 1 ? "item" : "items"} added to the cart`
    // );

    // Clear the notification after a certain time (e.g., 5 seconds)
    // setTimeout(() => {
    //   setNotification("");
    // }, 5000);
    dispatch(addToCart(product));
  };

  const [selectedQuantities, setSelectedQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  return (
    <div className="wrapper">
      <h1>Products List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <select
              value={selectedQuantities[product.id] || 1}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                handleQuantityChange(product.id, newQuantity);
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                handleAddToCart(
                  { ...product, quantity: selectedQuantities[product.id] || 1 },
                  selectedQuantities[product.id] || 1
                )
              }
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      {/* {notification && <Notification message={notification} />} */}
    </div>
  );
};

export default ProductList;
