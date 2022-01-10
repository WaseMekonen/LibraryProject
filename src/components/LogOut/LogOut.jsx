import React from "react";

export default function LogOut({ setAuth }) {
  return (
    <div>
      <p onClick={() => setAuth(null)}>log Out</p>
    </div>
  );
}
