import React, { useState } from "react";
import Details from "../../components/Details/Details";
import ReactStars from "react-rating-stars-component";

export default function ReadingList({
  readingList,
  setReadingList,
  setCompletedList,
  completedList,
  showShortDescription,
}) {
  // Star rating:
  const ratingChanged = (bookId, newRating) => {
    // console.log("bookId", bookId);
    // console.log("newRating", newRating);
    const readingListCopy = [...readingList];
    readingListCopy.forEach((book) => {
      if (book.id === bookId) {
        book.rating = newRating;
      }
    });
    setReadingList(readingListCopy);
    console.log('readingListUpdated',readingListCopy)
    localStorage.setItem("readingList", JSON.stringify(readingListCopy));
  };

  const [bookDetails, setBookDetails] = useState("");

  const addToCompletedList = (itemId, array, setArray) => {
    const newBookArray = array;
    const currentBook = readingList.find((book) => book.id == itemId);
    newBookArray.push(currentBook);
    setArray(newBookArray);
  };

  const removeBook = (id) => {
    const newReadingArr = readingList.filter((book) => {
      return book.id !== id;
    });
    setReadingList(newReadingArr);
  };

  const readingElement = readingList.map((book) => (
    <div className="book-container" key={book.id}>
      <div className="book-image">
        <img
          src={book.imgUrl}
          onClick={() => {
            setBookDetails(book);
          }}
        />
      </div>
      <div className="book-details">
        <div className="book-names">
          <div className="book-title">
            <h3>{book.title}</h3>
          </div>
          <div className="book-author">
            <h4>{book.author}</h4>
          </div>
          <div className="rating">
            <ReactStars
              count={5}
              value={book.rating || 0}
              onChange={ratingChanged.bind(this, book.id)}
              size={24}
              activeColor="#ffd700"
            />
          </div>
        </div>
        <div className="book-description">
          <div>
            <h5>{showShortDescription(book.description)}</h5>
          </div>
        </div>
      </div>
      <div className="book-button">
        <button
          onClick={() => {
            removeBook(book.id);
          }}
        >
          Remove From List
        </button>
        <button
          onClick={() => {
            addToCompletedList(book.id, completedList, setCompletedList);
            removeBook(book.id);
          }}
        >
          Mark as read
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Reading list page</h1>
      {bookDetails ? (
        <Details
          item={bookDetails}
          setBookDetails={setBookDetails}
          showShortDescription={showShortDescription}
        />
      ) : (
        ""
      )}
      <div>{readingElement}</div>
    </div>
  );
}
