//import React, { useEffect, useState } from "react";
//import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import img1 from "./carouselImage/Carousels1.jpg";
import img2 from "./carouselImage/Carousels2.jpg";
import img3 from "./carouselImage/Carousels3.jpg";
import img4 from "./carouselImage/Carousels4.jpg";
import img5 from "./carouselImage/Carousels5.jpg";
import img6 from "./carouselImage/Carousels6.jpg";
import img7 from "./carouselImage/Carousels7.jpg";

const Carousels = () => {
  // const [carousels, setCarousels] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/Carousels"); // Replace with your JSON server URL and endpoint
  //       const data = response.data;
  //       setCarousels(data);
  //     } catch (error) {
  //       console.error("Error fetching carousels:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <Carousel style={{ padding: "20px" }} indicators={false}>
        <Carousel.Item>
          <img src={img1} alt="first " text="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img2} alt="first " text="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img3} alt="first " text="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img4} alt="first " text="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img5} alt="first " text="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img6} alt="first " text="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={img7} alt="first " text="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousels;
