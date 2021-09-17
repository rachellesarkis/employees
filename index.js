require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/employeeRouter"));

const URI = process.env.MONGODB_URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
