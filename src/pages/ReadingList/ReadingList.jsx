import React from "react";

export default function ReadingList({
  readingList,
  setReadingList,
  setCompletedList,
  completedList,
  showShortDescription,
  auth,
}) {
  const userReadingLocalStorage = JSON.stringify(readingList);
  localStorage.setItem("readingList", userReadingLocalStorage);

  const addToCompletedList = (itemId, array, setArray) => {
    const newBookArray = array;
    const currentBook = readingList.find((book) => book.id == itemId);
    newBookArray.push(currentBook);
    setArray(newBookArray);
    // newBookArray.splice(currentBook, 1);
  };

  const removeBook = (id) => {
    const newReadingArr = readingList.filter((book) => {
      return book.id !== id;
    });
    setReadingList(newReadingArr);
  };

  const readingElement = readingList.map((book) => (
    <div key={book.id}>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img src={book.imgUrl} />
      <h5>{showShortDescription(book.description)}</h5>
      <textarea
        cols="30"
        rows="10"
        placeholder="type here your notes"
      ></textarea>
      <button
        onClick={() => {
          removeBook(book.id);
        }}
      >
        Remove From List
      </button>
      <span> </span>
      <button
        onClick={() => {
          addToCompletedList(book.id, completedList, setCompletedList);
          removeBook(book.id);
        }}
      >
        Mark as read
      </button>
    </div>
  ));
  return (
    <div>
      <h1>Reading list page</h1>

      <div>{readingElement}</div>
    </div>
  );
}
