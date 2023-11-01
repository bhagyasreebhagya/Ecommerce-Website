import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateCartItemQuantity,
  toggleCartItemEditMode,
  removeItemFromCart,
} from "../redux/cartSlice";
// import { Button } from "bootstrap";

import Button from "@mui/material/Button";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems.length);
  const isLoggedIn = useSelector((state) => state.allUser.isLoggedIn);
  console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = (item) => {
    dispatch(toggleCartItemEditMode(item.id));
  };

  const handleSaveClick = (item) => {
    // Update the quantity and exit edit mode
    dispatch(
      updateCartItemQuantity({ itemId: item.id, newQuantity: item.quantity })
    );
    dispatch(toggleCartItemEditMode(item.id));
  };

  const handleCancelClick = (item) => {
    // Revert changes and exit edit mode
    dispatch(
      updateCartItemQuantity({
        itemId: item.id,
        newQuantity: item.originalQuantity,
      })
    );
    dispatch(toggleCartItemEditMode(item.id));
  };
  const handleRemoveClick = (item) => {
    //Remove items from cart
    dispatch(
      updateCartItemQuantity({
        itemId: item.id,
        newQuantity: item.originalQuantity,
      })
    );
    dispatch(removeItemFromCart(item.id));
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <div style={{ backgroundColor: "white", padding: "10px" }}>
          <div
            style={{
              backgroundColor: "white",
              marginLeft: "750px",
              display: "flex",
            }}
          >
            <div>
              <h4>{`Total Cart Price: ₹${cartItems
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}`}</h4>
            </div>
            <div>
              {isLoggedIn &&
                (cartItems.length > 0 ? (
                  <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate("/payment")}
                  >
                    Proceed to Buy
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={() => navigate("/payment")}
                    disabled
                  >
                    Proceed to Buy
                  </Button>
                ))}
              {!isLoggedIn && (
                <Button
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  onClick={() => navigate("/login")}
                >
                  Proceed to Buy
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {cartItems.map((item) => (
        <div key={item.id} style={{ padding: "10px" }}>
          <div style={{ backgroundColor: "white", padding: "10px" }}>
            <img src={item.image}></img>
            <h4>{item.title}</h4>
            <p>{`Price: ${item.price} per item`}</p>
            {item.isEditing ? (
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);
                    dispatch(
                      updateCartItemQuantity({ itemId: item.id, newQuantity })
                    );
                  }}
                />
                <button onClick={() => handleSaveClick(item)}>Save</button>
                <button onClick={() => handleCancelClick(item)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{`Quantity: ${item.quantity}`}</p>
                <p>
                  {item.totalPrice !== undefined
                    ? `Total Price: ₹${item.totalPrice.toFixed(2)}`
                    : "Total Price: N/A"}
                </p>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleRemoveClick(item)}>Remove</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
