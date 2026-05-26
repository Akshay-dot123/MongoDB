const express = require("express");
const ejs = require("ejs");
const app = express();

app.use(express.urlencoded({ extended: true })); // This is used to parse URL-encoded data from request body, without this we will get undefined when we try to access req.body also extended:true allows us to parse nested objects from form data, if we set it to false we can only parse simple key-value pairs from form data
app.set("view engine", "ejs");
// app.set("views", "./templates");    // Only use this when u want to change name of the views folder

const fs = require("fs");
console.log(__filename);
console.log(__dirname);
const path = require("path");
const filePath = path.join(__dirname, "foldername", "fielname.txt");
console.log(filePath);
app.get("/video", (req, res) => {
  const stream = fs.createReadStream("./sample.txt", "utf-8");
  stream.pipe(res);
  stream.on("data", (chunk) => {
    console.log("Chunk received:", chunk.length);
    res.write(chunk);
  });

  stream.on("end", () => {
    console.log("Video streaming completed");
    res.end();
  });
});

app.get("/", (req, res) => {
  const user = {
    name: "John Doe",
    age: 30,
    hobbies: ["Reading", "Traveling", "Cooking"],
  };
  res.render("home", { user });
});

app.post("/submit", (req, res) => {
  const { username } = req.body;
  // res.send(`Form submitted! Hello ${username}`);
  res.redirect("https://stackoverflow.com");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
