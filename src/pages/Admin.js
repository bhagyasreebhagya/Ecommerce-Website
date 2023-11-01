import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export const Admin = () => {
  const navigate = useNavigate();
  const [products, setAllProducts] = useState([]);
  console.log(products);

  const fetchData = async () => {
    // e.preventDefault();
    const response = await fetch(`http://localhost:8000/products`);
    const data = await response.json();
    console.log(data);
    setAllProducts(data);
  };

  products && localStorage.setItem("products", JSON.stringify(products));

  return (
    <Container
      style={{
        backgroundColor: "white",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <button onClick={() => navigate("/adduser")}>Add user</button>
      <button onClick={() => navigate("/addproduct")}>Add product</button>
      <button onClick={() => navigate("/viewuser")}>View User</button>
      <button onClick={() => navigate("/viewproduct")}>View Product</button>
    </Container>
  );
};
