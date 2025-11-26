const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World from Express.js");
});

const students = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const studId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studId);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put("/students/:id", (req, res) => {
  const studId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studId);
  if (student) {
    Object.assign(student, req.body);
    res.json(student);
  } else {
    return res.status(404).send({ message: "Student not found" });
  }
});

app.delete("/students/:id", (req, res) => {
  const studId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studId);
  if (index !== -1) {
    students.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Student not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
