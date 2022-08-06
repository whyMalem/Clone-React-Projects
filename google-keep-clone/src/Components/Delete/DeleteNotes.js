import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { DataContext } from "../../Context/DataProvider";
// import EmptyNotes from "./EmptyNotes";
// import Form from "./Form";
import DeleteNote from "./DeleteNote";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {
  const { deleteNotes } = useContext(DataContext);
  // console.log();
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* <Form /> */}

        <Grid container style={{ marginTop: 16 }}>
          {deleteNotes.map((note) => (
            <Grid key={note.id} item>
              <DeleteNote note={note} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DeleteNotes;
