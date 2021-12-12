import React, { useState, useEffect } from "react";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const res = await fetch("http://localhost:5000/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    console.log("!!!!!!!!!!!!", data.User);
    if (res.ok) {
      setUsers(data.User);
    } else {
      alert("something wrong");
    }
  }

  useEffect(() => {
    console.log("useEffect");
    getUsers();
  }, []);

  return (
    <div>
      <h1>App</h1>
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
