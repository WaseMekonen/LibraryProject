import React from "react";

export default function Details({ item }) {
  return (
    <div>
      <h3>{item.title}</h3>
      <h4>{item.author}</h4>
      <img src={item.imgUrl} />
      <h5>{item.description}</h5>
    </div>
  );
}
