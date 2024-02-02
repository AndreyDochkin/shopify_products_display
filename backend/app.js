const express = require("express");
const database = require("./database"); // Database connection setup
const cors = require("cors");
const helmet = require("helmet");
const limiterConfig = require("./utils/rateLimitConfig"); // Rate limiting to prevent abuse
const corsConfig = require("./utils/corsConfig"); // CORS configuration for cross-origin requests
const productRoutes = require("./routes/products"); // Routes for product operations
const { fetchAndSaveProducts } = require("./controllers/products"); // Function to fetch products from Shopify and save to DB
const { PORT } = require("./config");

const app = express();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(limiterConfig);
app.use(express.json());

// Routing
app.use("/", productRoutes);

database(); // Initialize database connection

// Start the server and fetch initial data from external api
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchAndSaveProducts(); //
});
