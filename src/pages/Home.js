import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useDispatch
//import setAllUsers from "../redux/allUsersSlice"; // Import your action
import Categories from "../components/home/Categories";
import Carousels from "../components/home/Carousels";
import BestElectronics from "../components/home/BestElectronics";
import Cosmetics from "../components/home/Cosmetics";
import Footer from "../components/home/Footer";

const Home = () => {
  const [allUsers, setAllUsers] = useState([]);
  //const dispatch = useDispatch(); // Get the dispatch function
  const userData = useSelector((state) => state.allUser.users);
  console.log(userData);
  // Use useSelector to access data from the allUser slice in the store
  //const allUserData = useSelector((state) => state.allUser);

  const fetchData = async () => {
    // e.preventDefault();
    const response = await fetch(`http://localhost:8000/users`);
    const data = await response.json();
    console.log(data);
    setAllUsers(data);
  };
  useEffect(() => {
    fetchData("home");
    // suggestions && setUser(suggestions)
  }, []);
  // Store the fetched data in localStorage
  allUsers && localStorage.setItem("userData", JSON.stringify(allUsers));

  return (
    <div>
      <Categories />
      <Carousels />
      <BestElectronics />
      <Cosmetics />
      <Footer />
    </div>
  );
};

export default Home;
