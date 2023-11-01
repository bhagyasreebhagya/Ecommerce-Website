import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import ExplicitTwoToneIcon from "@mui/icons-material/ExplicitTwoTone";
import Search from "./styled/Search";
import SearchIconWrapper from "./styled/SearchIconWrapper";
import StyledInputBase from "./styled/StyledInputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/allUsersSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.allUser.isLoggedIn);
  const loggedUser = useSelector((state) => state.allUser.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [electronics, setElectronics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/BestElectronics"
        );
        const data = response.data;
        setElectronics(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = electronics.filter((product) => {
      if (
        product.title &&
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
      return false;
    });

    setSearchResults(results);
  }, [searchTerm, electronics]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleResultClick = (productId) => {
    navigate(`/results/${productId}`);
    setSearchTerm(""); // Clear the search term when a result is clicked
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <ExplicitTwoToneIcon onClick={() => navigate("/")} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ecommerce App
          </Typography>
          <Stack direction="row" spacing={2}>
            {isLoggedIn ? (
              <>
                <Button color="inherit">
                  <span>{loggedUser.firstName}</span>
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            )}
            <Button color="inherit" onClick={() => navigate("/shopping-cart")}>
              <ShoppingCartIcon />
              <span style={{ marginLeft: "8px" }}>Cart</span>
            </Button>
          </Stack>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for Products.."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>

      {searchTerm && (
        <div>
          {searchResults.length > 0 && (
            <div>
              {searchResults.map((product, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "#5398dd",
                    marginLeft: "1243px",
                    fontSize: "small",
                    color: "white",
                    borderRadius: "3px",
                    marginTop: "8px",
                    marginRight: "39px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleResultClick(product.id)}
                >
                  <p style={{ fontSize: "15px", marginLeft: "15px" }}>
                    {product.title}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
