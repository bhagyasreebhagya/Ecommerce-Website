import { useContext, useState } from "react";
import React from "react";
import { ProductContext } from "../App";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

const SingleDetail = () => {
  const navigate = useNavigate;
  const { product } = useContext(ProductContext);
  console.log(product);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState("");

  const handleAddToCart = (product, quantity) => {
    // Add the product to the cart logic
    // Show a notification
    // setNotification(`${product.item}`);

    setNotification(
      `${quantity} ${quantity === 1 ? "item" : "items"} added to the cart`
    );

    // Clear the notification after a certain time (e.g., 5 seconds)
    setTimeout(() => {
      setNotification("");
    }, 5000);
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
    <Container
      fluid
      style={{
        paddingTop: "100px",

        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <Row style={{ width: "90%", margin: "0 auto" }}>
        <Col sm={6}>
          <Image src={product.image} alt={product.title} fluid />;
        </Col>
        <Col sm={6}>
          {product ? (
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>

              <p>Price: {product.price}</p>
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
            </div>
          ) : (
            <p>No product selected.</p>
          )}
          <Button
            variant="contained"
            onClick={() =>
              handleAddToCart(
                { ...product, quantity: selectedQuantities[product.id] || 1 },
                selectedQuantities[product.id] || 1
              )
            }
          >
            Add to CART
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleDetail;
