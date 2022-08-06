import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext } from "react";
import {
  ArchiveOutlined as Archive,
  DeleteOutline as Delete,
} from "@mui/icons-material";
import { DataContext } from "../../Context/DataProvider";

const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const Note = ({ note }) => {
  const { notes, setNotes, archiveNotes, setArchiveNotes, setDeleteNotes } =
    useContext(DataContext);

  const archiveNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setArchiveNotes([...archiveNotes, note]);
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setDeleteNotes((prevValue) => [...prevValue, note]);
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography style={{ fontWeight: 600 }}>{note?.heading}</Typography>
        <Typography>{note?.text}</Typography>
      </CardContent>

      <CardActions>
        <Archive
          fontSize="small"
          titleAccess="Archive"
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => archiveNote(note)}
        />

        <Delete
          fontSize="small"
          titleAccess="Delete"
          style={{ cursor: "pointer" }}
          onClick={() => deleteNote(note)}
        />
      </CardActions>
    </StyledCard>
  );
};

export default Note;
