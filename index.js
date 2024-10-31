const express = require("express");
const PORT = 3000;

const server = express();
const router = require("./routes/index");

server.set("view engine", "ejs");

server.use(express.json());
server.use(express.static("public"));

server.use("/task", router);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
