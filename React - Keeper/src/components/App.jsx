import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateNote from './CreateNote';

const App = () => {
  const [notes, setNotes] = useState([]);

  const addNote = (note) => {
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((item, i) => i !== id);
    });
  };

  return (
    <div>
      <Header />
      <CreateNote addNote={addNote} />
      {notes.map(({ title, content }, i) => (
        <Note
          key={i}
          id={i}
          title={title}
          content={content}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
};

export default App;
