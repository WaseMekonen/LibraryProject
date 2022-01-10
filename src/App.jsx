import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import LogOut from "./components/LogOut/LogOut";
import Register from "./pages/Register/Register";
import Search from "./pages/Search/Search";
import ReadingList from "./pages/ReadingList/ReadingList";
import CompletedList from "./pages/CompletedList/CompletedList";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [auth, setAuth] = useState("");
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  const userLocalStorage = JSON.stringify(auth ? auth.email : auth);

  localStorage.setItem("auth", userLocalStorage);



  function showShortDescription(description) {
    const readMore = <Link to="/Details">...</Link>
    if (description.length > 200) {
      let newWord = description.slice(0, 200) + `${readMore}`;
      return newWord;
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        {!auth ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link> <Link to="/Register">Register</Link>
          </>
        ) : (
          <Redirect to="/Search" />
        )}
        {auth ? (
          <>
            <Link to="/Search">Search</Link>
            <span> </span>
            <Link to="/ReadingList">Reading List</Link>
            <span> </span>
            <Link to="/CompletedList">Completed List</Link>
          </>
        ) : (
          <Redirect to="/" />
        )}

        {auth ? <LogOut setAuth={setAuth} /> : <Redirect to="/" />}

        <Switch>
          <Route exact path="/" render={() => <Home />}></Route>
          <Route
            exact
            path="/Login"
            render={() => <Login setAuth={setAuth} />}
          ></Route>
          <Route
            exact
            path="/Register"
            render={() => <Register setAuth={setAuth} />}
          ></Route>
          <Route
            exact
            path="/Search"
            render={() => (
              <Search
                showShortDescription={showShortDescription}
                setBooks={setBooks}
                books={books}
                setCompletedList={setCompletedList}
                completedList={completedList}
                setReadingList={setReadingList}
                readingList={readingList}
                auth={auth}
              />
            )}
          ></Route>
          <Route
            exact
            path="/ReadingList"
            render={() => (
              <ReadingList
                showShortDescription={showShortDescription}
                setBooks={setBooks}
                setReadingList={setReadingList}
                readingList={readingList}
                setCompletedList={setCompletedList}
                completedList={completedList}
                auth={auth}
              />
            )}
          ></Route>
          <Route
            exact
            path="/CompletedList"
            render={() => (
              <CompletedList
                showShortDescription={showShortDescription}
                setBooks={setBooks}
                setCompletedList={setCompletedList}
                completedList={completedList}
                auth={auth}
              />
            )}
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
