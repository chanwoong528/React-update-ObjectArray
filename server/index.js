require("dotenv").config({ path: "../env/port.env" });
require("dotenv").config({ path: "../env/db.env" });
const express = require("express");
const cors = require("cors");

const { Client, Query } = require("pg");
const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: process.env.PG_PORT,
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected");
  }
});

const PORT = process.env.SERVER_PORT || 6000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "PUT", "GET", "PATCH"],
    credentials: true,
  })
);

app.get("/users", async (req, res) => {
  const getUsersQuery = new Query("select * from pre_emp_users");
  const User = await new Promise((resolve, reject) => {
    db.query(getUsersQuery, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log(result.rows);
        resolve(result.rows);
      }
    });
  });

  if (!User) {
    res.status(404).send({ message: "no User found" });
  } else {
    res.status(200).send({ User });
  }
});

app.post("/users/:email", async (req, res) => {
  const email = req.params.email;
  const fname = req.body.fname;
  console.log(email, fname);
  const updateFnameQuery = new Query(`UPDATE pre_emp_users
  SET firstname = '${fname}'
  where email = '${email}'`);

  db.query(updateFnameQuery, (err, result) => {
    if (err) {
      return res.status(500).send({ message: err });
    } else {
      return res.status(200).send({ message: "update success" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server 🚀: ${PORT}`);
});
