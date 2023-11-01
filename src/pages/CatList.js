import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export const CatList = () => {
  const { productTitleFromCat } = useParams();
  console.log(productTitleFromCat);
  const [categories, setCategories] = useState([]);

  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [notification, setNotification] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/Grocery");
        const data = response.data;
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  //   const numericProductId = parseInt(productId); // Convert productId to a number
  console.log(productTitleFromCat);
  const productTitle = String(productTitleFromCat);
  console.log(productTitle);
  const product = categories.find((item) => item.dep === productTitle);
  console.log(product);

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
