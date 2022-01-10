import axios from "axios";
import React, { useState } from "react";
import { API_KEY } from "../../logic";

export default function Register({setAuth}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [wrongPass, setWrongPass] = useState(false);

  function signUp() {
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    axios
      .post(URL, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        setAuth(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response);
      });
  }

  function isValidPassword() {
    if (validPassword == password) {
      signUp();
      
    } else {
      setWrongPass(true);
      alert("password doesn't match!")
    }
  }

  return (
    <div>
      <h3>Register Here</h3>
      <form
        onSubmit={(e) => {
          isValidPassword();
          e.preventDefault();
          e.target[0].value = "";
          e.target[1].value = "";
          e.target[2].value = "";
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
        <input
          type="Password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setValidPassword(e.target.value);
          }}
        />
        <br />
        <br />
        <input type="submit" value="Register" />
      </form>
      {wrongPass ? (
        <p style={{ color: "red" }}>password doesn't match</p>
      ) : null}
    </div>
  );
}
