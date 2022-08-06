import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import {
  RestoreFromTrashOutlined as Undo,
  DeleteForeverOutlined as Delete,
} from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const DeleteNote = ({ note }) => {
  const {
    notes,
    setNotes,
    archiveNotes,
    setArchiveNotes,
    deleteNotes,
    setDeleteNotes,
  } = useContext(DataContext);

  const restoreNote = (note) => {
    const updatedNotes = deleteNotes.filter((data) => data.id !== note.id);
    setDeleteNotes(updatedNotes);
    setNotes([...notes, note]);
  };

  const deleteNote = (note) => {
    const updatedNotes = deleteNotes.filter((data) => data.id !== note.id);
    setDeleteNotes(updatedNotes);
    // setDeleteNotes((prevValue) => [...prevValue, note]);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography style={{ fontWeight: 600 }}>{note?.heading}</Typography>
        <Typography>{note?.text}</Typography>
      </CardContent>

      <CardActions>
        <Delete
          fontSize="small"
          titleAccess="DeleteForever"
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => deleteNote(note)}
        />
        <Undo
          fontSize="small"
          titleAccess="Undo"
          style={{ cursor: "pointer" }}
          onClick={() => restoreNote(note)}
        />
      </CardActions>
    </StyledCard>
  );
};

export default DeleteNote;
