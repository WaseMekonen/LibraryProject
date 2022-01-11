import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";

export default function Details({
  item,
  setBookDetails,
  showShortDescription,
}) {
  const [note, setNote] = useState("");
  return (
    <div>
      <h3>{item.title}</h3>
      <h4>{item.author}</h4>
      <StarRating />
      <br/>
      <img src={item.imgUrl} />
      <h5>{showShortDescription(item.description)}</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBookDetails(item);
          console.log(item);
        }}
      >
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            setNote(e.target.value);
          }}
        >
          {item.note}
        </textarea>
        <br />
        <input type="submit" value="save note" />
      </form>
    </div>
  );
}
