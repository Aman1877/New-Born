import React, { useState, useEffect } from "react";
import { Typography, Box, styled } from "@mui/material";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Component = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "55px 130px 0 130px !important",
  overflowX: "overlay",
  [theme.breakpoints.down("lg")]: {
    margin: "0px !important",
  },
}));

const Container = styled(Box)`
  padding: 12px 20px;
  text-align: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5, // Adjust the number of items to show on a laptop/desktop
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const HomePageNavbar = () => {
  const [categories, setCategories] = useState([]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      showDots={false}
      swipeable={false}
      draggable={false}
      customButton={false} // Hide navigation buttons
      autoPlay={true} // Enable auto-scrolling
      autoPlaySpeed={2000} // Set the auto-scroll speed in milliseconds (adjust as needed)
    >
      {/* <Component> */}
      {categories.map((category) => (
        <Container key={categories._id}>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/category/category-photo/${category._id}`}
            style={{ width: 64 }}
          />
          <Text>{category.name}</Text>
        </Container>
      ))}
      {/* </Component> */}
    </Carousel>
  );
};

export default HomePageNavbar;
