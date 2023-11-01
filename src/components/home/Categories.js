import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",

  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",

  color: theme.palette.text.secondary,
  border: 0, // Add this line to remove the border
  transition: "transform 0.1s", // Add a smooth transition for the transform property
  "&:hover": {
    transform: "scale(1.1)", // Add a scale transform on hover
  },
}));

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories"); // Replace with your JSON server URL and endpoint
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryList = (title) => {
    navigate(`/catlist/${title}`);
    //setSearchTerm(""); // Clear the search term when a result is clicked
  };

  return (
    <Box
      sx={{
        width: "97%",
        height: "140px",
        display: "flex",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Adjust column width as needed
        gap: "16px", // Adjust the gap between category boxes

        marginTop: 1,
        marginInline: "auto",
        backgroundColor: "#ffffff",
      }}
    >
      {categories.map((category) => (
        <Grid
          container
          spacing={2}
          sx={{ marginLeft: "5px", marginTop: "5px" }}
        >
          <Grid item xs={8}>
            <Item onClick={() => handleCategoryList(category.title)}>
              <img
                src={category.image}
                alt={category.title}
                width="60"
                height="60"
              />
              <br></br>
              <b>{category.title}</b>
            </Item>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default Categories;
