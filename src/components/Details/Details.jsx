import { useState } from "react";
import "./Details.css";

export default function Details({ item }) {
  const [tempNote, setTempNote] = useState("");
  const [userNotes, setUserNotes] = useState([]);

  function saveUserNote(tempNote, itemId) {
    let newNote = {
      id: itemId,
      content: tempNote,
    };

    const updatedNotes = userNotes;
    updatedNotes.push(newNote);
    setUserNotes(updatedNotes);
    // localStorage.setItem("notes", JSON.stringify(notesElement));
  }

  const filteredNoteByBookId = userNotes.filter((note) => {
    return note.id == item.id;
  });
  

  const elements = filteredNoteByBookId.map((note, i) => {
    return <p key={i}>{note.content}</p>;
  });

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
          {/* <h3>{(item.note = tempNote)}</h3> */}
        </div>
        <div className="user-notes">{elements}</div>
      </div>
      <div className="details-bottom">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUserNote(tempNote, item.id);
          }}
        >
          <textarea
            cols="50"
            rows="6"
            onInput={(e) => {
              setTempNote(e.target.value);
            }}
          ></textarea>
          <input type="submit" value="save note" />
        </form>
      </div>
    </div>
  );
}
