import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useContext } from "react";
import { ProductContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

  color: theme.palette.text.secondary,
  width: "150px",
  height: "120px",
  border: 0,
  boxShadow: "none", // Add this line to remove the border
  transition: "transform 0.1s", // Add a smooth transition for the transform property
  "&:hover": {
    transform: "scale(1.1)", // Add a scale transform on hover
  },
}));

const BestElectronics = () => {
  const { product, setProduct } = useContext(ProductContext);
  const [electronics, setElectronics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/BestElectronics"
        ); // Replace with your JSON server URL and endpoint
        const data = response.data;
        setElectronics(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "-22px",
          height: "320px",
        }}
      >
        <h4 style={{ padding: "12px" }}>Best Of Electronics</h4>

        <div style={{ display: "flex" }}>
          {electronics.map((electronics) => (
            <Grid
              container
              spacing={2}
              sx={{ marginLeft: "5px", marginTop: "5px" }}
            >
              <Grid item xs={8}>
                <Item
                  onClick={() => {
                    setProduct(electronics);
                    navigate("/single");
                  }}
                >
                  <img
                    src={electronics.image}
                    alt={electronics.title}
                    style={{ width: "150px", height: "150px" }}
                  />
                  <br></br>
                  <b>{electronics.title}</b>
                  <br></br>
                  <b>{electronics.price}</b>
                </Item>
              </Grid>
            </Grid>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestElectronics;
