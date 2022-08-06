import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import { DataContext } from "../../Context/DataProvider";
import EmptyNotes from "./EmptyNotes";
import Form from "./Form";
import Note from "./Note";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const reorder = (list, start, end) => {
  const result = Array.from(list);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);

  return result;
};

const Notes = () => {
  const { notes, setNotes } = useContext(DataContext);
  // console.log();

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = reorder(notes, result.source.index, result.destination.index);
    setNotes(items);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Form />
        {notes.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <Grid
                  container
                  style={{ marginTop: 16 }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {notes.map((note, index) => (
                    <Draggable
                      key={note.id}
                      draggableId={note.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Grid
                          item
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Note note={note} />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;
