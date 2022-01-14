import React, { useState } from "react";
import "./Details.css";

export default function Details({ item }) {
  const [userNotes, setUserNotes] = useState([]);
  const [note, setNote] = useState([]);

  function saveUserNote(note, itemId) {
    let newNote = {
      id: itemId,
      content: note,
    };
    const notesElement = [newNote,...userNotes];
    setUserNotes(notesElement);
    console.log(notesElement);
  }

  const newNotes= userNotes.filter((note) => {
    return note.id == item.id;
    }  )

  return (
    <div className="details-container">
      <div className="details-top">
        <div className="details-image">
          <img src={item.imgUrl} />
        </div>
        <div className="details-titles">
          <h3>{item.title}</h3>
          <h4>{item.author}</h4>
          <h5>{item.description}</h5>
        </div>
        <div className="user-notes">
          {newNotes.map((note, i) => {
            return <p key={i}>{note.content}</p>;
          })}
         
        </div>
      </div>
      <div className="details-bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUserNote(note, item.id);
          }}
        >
          <textarea
            cols="50"
            rows="6"
            onInput={(e) => {
              setNote(e.target.value);
            }}
          ></textarea>
          <input type="submit" value="save note" />
        </form>
      </div>
    </div>
  );
}
