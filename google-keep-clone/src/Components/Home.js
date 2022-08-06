import { Box } from "@mui/material";
import React from "react";
// import Notes from "./Notes/Notes";
import SwipeDrawer from "./SwipeDrawer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Notes from "./Notes/Notes";
import ArchiveNotes from "./Archive/ArchiveNotes";
import DeleteNotes from "./Delete/DeleteNotes";

const Home = () => {
  return (
    <>
      <Router>
        <Box style={{ display: "flex", width: "100%" }}>
          <SwipeDrawer />

          <Routes>
            <Route path="/" exact element={<Notes />} />
            <Route path="/archive" exact element={<ArchiveNotes />} />
            <Route path="/delete" exact element={<DeleteNotes />} />
          </Routes>

          {/* <Notes /> */}
        </Box>
      </Router>
    </>
  );
};

export default Home;
