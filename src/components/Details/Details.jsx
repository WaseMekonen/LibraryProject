import React, { useState } from "react";
// import StarRating from "../StarRating/StarRating";

export default function Details({ item }) {
  const [userNotes, setUserNotes] = useState([]);
  const [note, setNote] = useState([]);

  function saveUserNote(note) {
    const notesElement = [...userNotes];
    notesElement.push(note);
    setUserNotes(notesElement);
    console.log(notesElement);
  }

  return (
    <div>
      <h3>{item.title}</h3>
      <h4>{item.author}</h4>
      <br />
      <img src={item.imgUrl} />
      <h5>{item.description}</h5>
      {userNotes.map((note, i) => {
        return <p key={i}>{note}</p>;
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveUserNote(note);
        }}
      >
        <textarea
          name=""
          id=""
          cols="50"
          rows="6"
          onInput={(e) => {
            setNote(e.target.value);
          }}
        ></textarea>
        <br />
        <input type="submit" value="save note" />
      </form>
    </div>
  );
}
