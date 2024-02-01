const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = require("./config");

const app = express();

app.use(cors(corsConfig)); // Apply CORS
app.use(helmet()); // Set security headers
app.use(limiterConfig); // Apply rate limiting

app.use(express.json());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
