import { Grid } from "@mui/material";
import React from "react";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./Post/Posts";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} xs={12}>
          <Categories />
        </Grid>

        <Grid container item xs={12} lg={10}>
          <Posts />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
