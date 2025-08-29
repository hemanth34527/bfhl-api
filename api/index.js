const express = require("express");
const app = express();

app.use(express.json());

// User details
const USER_ID = "hemanth_gopal_nidamanuri_21062004";
const EMAIL = "gopal.22bce9918@vitapstudent.ac.in";
const ROLL_NUMBER = "22BCE9918";

function processData(data) {
  let odd_numbers = [];
  let even_numbers = [];
  let alphabets = [];
  let special_characters = [];
  let sum = 0;

  data.forEach((item) => {
    if (/^-?\d+$/.test(item)) {
      // It's a number
      let num = parseInt(item, 10);
      sum += num;
      if (num % 2 === 0) even_numbers.push(item.toString());
      else odd_numbers.push(item.toString());
    } else if (/^[a-zA-Z]+$/.test(item)) {
      // Alphabets
      alphabets.push(item.toUpperCase());
    } else {
      // Special chars
      special_characters.push(item);
    }
  });

  // Build reverse concatenated alternating caps string
  let concat_string = alphabets
    .join("")
    .split("")
    .reverse()
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string,
  };
}

// Route
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input: data must be an array",
      });
    }

    const result = processData(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server Error" });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("BFHL API Running ✅");
});

module.exports = app;