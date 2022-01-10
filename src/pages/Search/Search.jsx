import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react/cjs/react.development";

export default function Search({
  setBooks,
  showShortDescription,
  books,
  readingList,
  setReadingList,
  auth,
}) {
  const [userSearchedInput, setUserSearchedInput] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const authEmail = auth.email;
  const emailLocalStorage = JSON.stringify(authEmail);
  localStorage.setItem("email", emailLocalStorage);

  const options = {
    method: "GET",
    url: "https://bookshelves.p.rapidapi.com/books",
    headers: {
      "x-rapidapi-host": "bookshelves.p.rapidapi.com",
      "x-rapidapi-key": "4e1eeaa98bmsh524186f937578fcp1af7c7jsn4d0f0e80c5ca",
    },
  };

  useEffect(() => {
    getBooks();
  }, [options.url]);

  function getBooks() {
    axios
      .request(options)
      .then(function (response) {
        setBooks(response.data.Books);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const addBookToList = (itemId, array, setArray) => {
    const newBookArray = array;
    const currentBook = books.find((book) => book.id == itemId);
    if (newBookArray.indexOf(currentBook) > -1) {
      alert("book alerdy exist in the list");
    } else {
      newBookArray.push(currentBook);
      setArray(newBookArray);
    }
  };

  function filterdSearchedBooks() {
    const titleArr = books.filter((book) =>
      book.title.includes(userSearchedInput)
    );
    const authorArr = books.filter((book) =>
      book.author.includes(userSearchedInput)
    );
    const descriptionArr = books.filter((book) =>
      book.description.includes(userSearchedInput)
    );

    let concatedArr = titleArr.concat(authorArr).concat(descriptionArr);
    let userSearchResult = [...new Set(concatedArr)];
    let shortDisplayResult = userSearchResult.splice(0, 10);
    setSearchedBooks(shortDisplayResult);
  }

  const elements = books.map((book) => (
    <div key={book.id}>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img src={book.imgUrl} />
      <h5>{showShortDescription(book.description)}</h5>

      <button
        onClick={() => addBookToList(book.id, readingList, setReadingList)}
      >
        Add to Reading List
      </button>
    </div>
  ));

  const searchingResult = searchedBooks.map((book) => (
    <div key={book.id}>
      <h3>{book.title}</h3>
      <h4>{book.author}</h4>
      <img src={book.imgUrl} />
      <h5>{showShortDescription(book.description)}</h5>

      <button
        onClick={() => addBookToList(book.id, readingList, setReadingList)}
      >
        Add to Reading List
      </button>
    </div>
  ));

  const shortElement = elements.splice(0, 10);

  return (
    <div>
      <h2>Search page</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          filterdSearchedBooks();
        }}
      >
        <input
          type="text"
          placeholder="Search a book"
          onChange={(e) => {
            setUserSearchedInput(e.target.value);
          }}
        />
        <input type="submit" value="Search" />
      </form>
      <div>{userSearchedInput ? searchingResult : shortElement}</div>
      <div>{userSearchedInput ? "" : shortElement}</div>
    </div>
  );
}
