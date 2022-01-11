import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Search({
  books,
  setBooks,
  showShortDescription,
  readingList,
  setReadingList,
}) {
  const [userSearchedInput, setUserSearchedInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const URL = "/data/books.json";

  useEffect(() => {
    getBooks();
  }, [URL]);

  function getBooks() {
    axios
      .get(URL)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addBookToList = (itemId, array, setArray) => {
    const newBookArray = array;
    const currentBook = books.find((book) => book.id == itemId);
    if (newBookArray.indexOf(currentBook) > -1) {
      alert("book is already exist");
    } else {
      newBookArray.push(currentBook);
      setArray(newBookArray);
    }
  };

  function filterdSearchedBooks() {
    const temporaryBooks = books;
    temporaryBooks.forEach((element) => {
      element.author1 = element.author;
      element.author = element.author.toLowerCase();
      element.description1 = element.description;
      element.description = element.description.toLowerCase();
      element.title1 = element.title;
      element.title = element.title.toLowerCase();
    });
    const filterByTitle = temporaryBooks.filter((book) =>
      book.title.includes(userSearchedInput)
    );
    const filterByAuthor = temporaryBooks.filter((book) =>
      book.author.includes(userSearchedInput)
    );
    const filterByDescription = temporaryBooks.filter((book) =>
      book.description.includes(userSearchedInput)
    );
    let concatedArr = filterByTitle
      .concat(filterByAuthor)
      .concat(filterByDescription);
    let userSearchResult = [...new Set(concatedArr)];
    let shortDisplayResult = userSearchResult.splice(0, 10);
    setSearchResult(shortDisplayResult);
  }

  const elements = books
    ? books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <h4>{book.author}</h4>
          <img src={book.imgUrl} />
          <h5>{showShortDescription(book.description)}</h5>
          <button
            onClick={() => {
              addBookToList(book.id, readingList, setReadingList);
            }}
          >
            Add to Reading List
          </button>
        </div>
      ))
    : null;

  const searchElements = searchResult.map((book) => (
    <div key={book.id}>
      <h3>{book.title1}</h3>
      <h4>{book.author1}</h4>
      <img src={book.imgUrl} />
      <h5>{showShortDescription(book.description1)}</h5>
      <button
        onClick={() => {
          addBookToList(book.id, readingList, setReadingList);
        }}
      >
        Add to Reading List
      </button>
    </div>
  ));

  const shortElement = elements ? elements.splice(0, 10) : null;

  return (
    <div>
      <h2>Search page</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterdSearchedBooks();
          userInput = "";
        }}
      >
        <input
          type="text"
          placeholder="Search a book"
          onInput={(e) => {
            let userInput = e.target.value;
            setUserSearchedInput(userInput.toLowerCase());
          }}
        />
        <input type="submit" value="Search" />
      </form>
      <div>{userSearchedInput ? searchElements : shortElement}</div>
    </div>
  );
}
