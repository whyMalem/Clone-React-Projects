import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { DataContext } from "../../Context/DataProvider";
// import EmptyNotes from "./EmptyNotes";
// import Form from "./Form";
import ArchiveNote from "./ArchiveNote";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const ArchiveNotes = () => {
  const { archiveNotes } = useContext(DataContext);
  // console.log();
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Grid container style={{ marginTop: 16 }}>
          {archiveNotes.map((note) => (
            <Grid key={note.id} item>
              <ArchiveNote note={note} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ArchiveNotes;
