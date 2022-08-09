import { Box, styled, Typography } from "@mui/material";
import React from "react";

const Image = styled(Box)(({ theme }) => ({
  background:
    "url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000",
  width: "100%",
  height: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    backgroundRepeatX: "no-repeat",
    objectFit: "contain",
    backgroundSize: "100%",
  },
}));

const Heading = styled(Typography)`
  font-size: 90px;
  text-transform: uppercase;
  color: #fff;
  line-height: 1;
`;
const SubHeading = styled(Typography)`
  font-size: 20px;
  background: #fff;
`;

const Banner = () => {
  return (
    <Image>
      <Heading>Blog</Heading>
      <SubHeading>Daily Coding Blogs</SubHeading>
    </Image>
  );
};

export default Banner;
