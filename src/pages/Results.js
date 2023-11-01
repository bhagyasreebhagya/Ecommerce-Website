import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

export const Results = () => {
  const [electronics, setElectronics] = useState([]);
  const { productId } = useParams();
  console.log(productId);
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/BestElectronics"
        );
        const data = response.data;
        console.log(data);
        setElectronics(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const numericProductId = parseInt(productId); // Convert productId to a number

  const product = electronics.find((item) => item.id === numericProductId);

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };
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
          {product ? (
            <div>
              <Image src={product.image} alt={product.title} fluid />
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
