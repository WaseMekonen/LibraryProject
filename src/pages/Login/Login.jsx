import axios from "axios";
import React from "react";
import { useState } from "react";
import { API_KEY } from "../../logic";

export default function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = JSON.parse(localStorage.getItem("email"));
  if (email == emailValid) {
    JSON.parse(localStorage.getItem("completdList"));
    JSON.parse(localStorage.getItem("readingList"));
  }

  function signIn() {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    axios
      .post(URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setAuth(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h3>User Login</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn();
          e.target[0].value = "";
          e.target[1].value = "";
        }}
      >
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}
