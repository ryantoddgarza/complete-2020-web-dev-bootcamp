import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';

const CreateNote = ({ addNote }) => {
  const defaultNote = {
    title: '',
    content: '',
  };

  const [note, setNote] = useState(defaultNote);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const submitNote = (e) => {
    e.preventDefault();
    addNote(note);
    setNote(defaultNote);
  };

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            type="text"
            value={note.title}
            name="title"
            placeholder="Title"
            onChange={handleInputChange}
          />
        )}
        <textarea
          id=""
          value={note.cntent}
          name="content"
          placeholder="Take a note..."
          cols="30"
          rows={isExpanded ? 3 : 1}
          onFocus={() => setIsExpanded(true)}
          onChange={handleInputChange}
        />
        {isExpanded && (
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        )}
      </form>
    </div>
  );
};

export default CreateNote;
