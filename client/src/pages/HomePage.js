import React from "react";
import "../styles/HomePageStyle.css";
import Layout from "../components/Layout/Layout";
import HomePageNavbar from "../components/Layout/HomePageNavbar";
import HomePageBanner from "../components/Layout/HomePageBanner";
import { Box, styled } from "@mui/material";
import { bannerData } from "../../src/constant/data";

const Component = styled(Box)`
  padding: 20px 10px;
  background: #f2f2f2;
`;

const HomePage = () => {
  return (
    <>
      <Layout title={"All Products - Best offers "}>
        <HomePageNavbar />
        <Component>
          <HomePageBanner />
        </Component>
      </Layout>
    </>
  );
};

export default HomePage;
