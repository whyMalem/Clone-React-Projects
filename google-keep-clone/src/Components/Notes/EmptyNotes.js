import React from "react";
import { LightbulbOutlined as Lightbulb } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Light = styled(Lightbulb)`
  font-size: 230px;
  color: #f5f5f5;
`;

const Text = styled(Typography)`
  color: #88868b;
  font-size: 22px;
`;
const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`;

const EmptyNotes = () => {
  return (
    <Container>
      <Light />
      <Text>Notes you add appear here</Text>
    </Container>
  );
};

export default EmptyNotes;
