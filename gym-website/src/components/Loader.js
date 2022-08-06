import { Stack } from "@mui/material";
import { Circles } from "react-loader-spinner";
import React from "react";

const Loader = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Circles color="gray" />
    </Stack>
  );
};

export default Loader;
