import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../redux/allUsersSlice";
//import { blockUser } from "../../redux/allUsersSlice";

export const ViewUser = () => {
  const allUserData = useSelector((state) => state.allUser.users);
  const dispatch = useDispatch();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserData, setEditableUserData] = useState({});

  const handleEditUser = (user) => {
    // Set the user's ID as editable
    setEditableUserId(user.id);
    // Create a copy of the user object
    setEditableUserData({ ...user });
  };

  const handleSaveEdit = () => {
    // Dispatch an action to edit the user in Redux store with the updated data
    dispatch(editUser({ id: editableUserId, updatedData: editableUserData }));
    // Clear the editable user ID
    setEditableUserId(null);
    // Clear the editable user data
    setEditableUserData({});
  };

  const handleBlockUser = (userId) => {
    // Toggle the user's blocked status
    const updatedData = {
      blocked: !allUserData.find((user) => user.id === userId).blocked,
    };
    dispatch(editUser({ id: userId, updatedData }));
  };

  // Log blocked users in the console
  const blockedUsers = allUserData.filter((user) => user.blocked);

  console.log("Blocked Users:", blockedUsers);

  return (
    <div>
      <h4>User Details</h4>
      <ul>
        {allUserData.map((user) => (
          <li key={user.id}>
            <strong>User ID: {user.id}</strong>
            <br />
            First Name:{" "}
            {editableUserId === user.id ? (
              <input
                type="text"
                value={editableUserData.firstName}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    firstName: e.target.value,
                  })
                }
              />
            ) : (
              user.firstName
            )}
            <br />
            Last Name:{" "}
            {editableUserId === user.id ? (
              <input
                type="text"
                value={editableUserData.lastName}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    lastName: e.target.value,
                  })
                }
              />
            ) : (
              user.lastName
            )}
            <br />
            Email Id:{" "}
            {editableUserId === user.id ? (
              <input
                type="text"
                value={editableUserData.email}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    email: e.target.value,
                  })
                }
              />
            ) : (
              user.email
            )}
            <br />
            Password:{" "}
            {editableUserId === user.id ? (
              <input
                type="text"
                value={editableUserData.password}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    password: e.target.value,
                  })
                }
              />
            ) : (
              user.password
            )}
            <br />
            {/* Role:{" "}
            {editableUserId === user.id ? (
              <input
                type="text"
                value={editableUserData.role}
                onChange={(e) =>
                  setEditableUserData({
                    ...editableUserData,
                    role: e.target.value,
                  })
                }
              />
            ) : (
              user.role
            )}
            <br /> */}
            {/* Rest of the user details */}
            {editableUserId === user.id ? (
              <button onClick={handleSaveEdit}>Save</button>
            ) : (
              <button onClick={() => handleEditUser(user)}>Edit</button>
            )}
            {user.blocked ? (
              <button onClick={() => handleBlockUser(user.id)}>Unblock</button>
            ) : (
              <button onClick={() => handleBlockUser(user.id)}>Block</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
