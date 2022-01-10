import React, { useState } from "react";
import Details from "../../components/LogOut/Details";

export default function CompletedList({
  completedList,
  setCompletedList,
  showShortDescription,
  auth,
}) {
  // const [show, setShow] = useState(false);
  const [bookDetails, setBookDetails] = useState("");

  const userCompletedLocalStorage = JSON.stringify(completedList);

  localStorage.setItem("completdList", userCompletedLocalStorage);

  const removeBook = (id) => {
    const newCompletedArr = completedList.filter((book) => {
      return book.id !== id;
    });
    setCompletedList(newCompletedArr);
  };

  const completedElement = completedList.map((book) => (
    <div key={book.id}>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img
        src={book.imgUrl}
        onClick={() => {
          setBookDetails(book);
        }}
      />
      <h5>{showShortDescription(book.description)}</h5>
      <button
        onClick={() => {
          removeBook(book.id);
        }}
      >
        Remove
      </button>
    </div>
  ));
  return (
    <div>
      <h1>Completed list page</h1>
      {bookDetails ? <Details item={bookDetails} /> : ""}
      <div>{completedElement}</div>
    </div>
  );
}
