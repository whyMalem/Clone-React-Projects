import { Box, ClickAwayListener, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext, useRef, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import { v4 as uuid } from "uuid";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 600px;
  box-shadow: 0 1px 2px rgb(60 64 67/30%), 0 2px 6px 2px rgb(60 64 67/15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: #e0e0e0;
  margin: auto;
  min-height: 30px;
`;

const note = {
  id: "",
  heading: "",
  text: "",
};

const Form = () => {
  const [show, setShow] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const containerRef = useRef();

  const { notes, setNotes } = useContext(DataContext);

  const onTextClick = () => {
    setShow(true);
    containerRef.current.style.minHeight = "90px";
  };

  const handleClickAway = () => {
    setShow(false);
    containerRef.current.style.minHeight = "30px";
    setAddNote({ ...note, id: uuid() });

    if (addNote.heading || addNote.text) {
      setNotes([...notes, addNote]);
    }
  };
  //   console.log(notes, "Notes");
  //   console.log(addNote, "addNote");
  const onTextChange = (e) => {
    const { name, value } = e.target;
    // console.log(name + " " + value);
    setAddNote({ ...addNote, [name]: value });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {show && (
          <TextField
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: 10 }}
            onChange={(e) => onTextChange(e)}
            name="heading"
            value={addNote.heading}
          />
        )}

        <TextField
          placeholder="Take a note..."
          multiline
          maxRows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextClick}
          onChange={(e) => onTextChange(e)}
          name="text"
          value={addNote.text}
        />
      </Container>
    </ClickAwayListener>
  );
};

export default Form;
