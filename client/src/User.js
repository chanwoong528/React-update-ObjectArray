import React, { useState } from "react";

function User({ user, users, setUsers }) {
  const [update, setUpdate] = useState(false);
  const [fname, setFname] = useState("");

  const onClickUpdateFname = async (email) => {
    const req = { fname };

    const res = await fetch(`http://localhost:5000/users/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(req),
    });
    const data = await res.json();
    if (res.ok) {
      let newArr = [...users];
      newArr.map((user) => {
        if (user.email === email) {
          return (user.firstname = fname);
        } else {
          return user;
        }
      });
      setUsers(newArr);
      setUpdate(false);
    } else {
      console.log(data.message);
    }
  };

  return (
    <div>
      <h1>User</h1>
      <li>
        <h1>{user.email}</h1>
        <h2>{user.firstname}</h2>

        {update ? (
          <div>
            <input
              type="text"
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
            <button
              onClick={() => {
                onClickUpdateFname(user.email);
              }}
            >
              confirm
            </button>
            <button
              onClick={() => {
                setUpdate(false);
              }}
            >
              cancle
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setUpdate(true);
            }}
          >
            update
          </button>
        )}
      </li>
    </div>
  );
}
export default User;
