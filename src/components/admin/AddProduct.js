import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/allProductSlice"; // Import the addProduct action from your productSlice

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Select from "@mui/material/Select"; // Import the Select component
import MenuItem from "@mui/material/MenuItem"; // Import the MenuItem component
import axios from "axios";

const defaultTheme = createTheme();

export function AddProduct() {
  //const allProductsData = useSelector((state) => state.products.users);
  //console.log(allProductsData);
  const dispatch = useDispatch();

  const [formState, setFormState] = React.useState({
    title: "",
    price: "",
    image: null,
    category: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormState({
      ...formState,
      image: file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    const data = new FormData(event.currentTarget);
    const values = {
      title: data.get("title"),
      price: data.get("price"),
      image: data.get("image"),
      category: data.get("category"),
    };

    // Retrieve the existing user data from local storage
    const storedProducts = localStorage.getItem("products");

    try {
      // Make a POST request to the json-server API
      const response = await axios.post(
        "http://localhost:8000/products",
        values
      );

      // Handle the response (e.g., show a success message)
      console.log(response.data);

      // Clear the input fields after successful sign-up
      event.target.reset(); // Reset the form
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("Error Adding products:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="title"
              value={formState.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              type="number"
              label="price"
              value={formState.price}
              onChange={handleInputChange}
            />
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              onChange={handleFileChange}
            />
            <Select // Use the Select component for the dropdown
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              value={formState.category}
              onChange={handleInputChange}
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="Grocery">Grocery</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Beauty Products">Beauty Products</MenuItem>
              {/* Add more MenuItem components for other categories */}
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
