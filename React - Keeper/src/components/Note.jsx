import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const Note = ({ id, title, content, deleteNote }) => {
  const handleDelete = () => {
    deleteNote(id);
  };

  return (
    <div className="note">
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Note;
