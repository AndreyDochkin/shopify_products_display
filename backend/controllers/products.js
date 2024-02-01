const Products = require("../models/products");
const { request, gql } = require("graphql-request");
const { STORE_NAME, STORE_TOKEN } = require("../config");

// GraphQL query
const GRAPHQL_PRODUCTS_QUERY = gql`
  {
    products(first: 8) {
      edges {
        node {
          id
          bodyHtml
          images(first: 1) {
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
`;

// Fetch products
const getProductsFromShopify = async () => {
  try {
    // Request GraphQL query
    const { products } = await request(
      `https://${STORE_NAME}/admin/api/2024-01/graphql.json`,
      GRAPHQL_PRODUCTS_QUERY,
      {},
      {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": STORE_TOKEN,
      }
    );

    const allProducts = products.edges.map((productEdge) => {
      const id = productEdge.node.id;
      const bodyHtml = productEdge.node.bodyHtml;
      const imageUrl = productEdge.node.images.edges[0]?.node.src || "";

      return {
        productId: id,
        bodyHtml,
        imageUrl,
      };
    });

    return allProducts;
  } catch (error) {
    console.error("Error requesting products:", error.message || error);
    throw error;
  }
};

// Save products to the database
const saveProductsToDB = async (products) => {
  try {
    await Promise.all(
      products.map((item) => {
        return Products.updateOne({ productId: item.productId }, item, {
          upsert: true,
        });
      })
    );
    console.log("Products saved to DB");
  } catch (error) {
    console.error("Error saving products to DB:", error.message || error);
    throw error;
  }
};

// Combined function to fetch and save products
exports.fetchAndSaveProducts = async () => {
  try {
    const products = await getProductsFromShopify();
    await saveProductsToDB(products);
  } catch (error) {
    console.error("Error saving products:", error.message || error);
  }
};
// Read and respond with all products from the database
exports.getProductsFromDB = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    console.error("Error reading DB:", error.message || error);
    res.status(500).json({ message: "Error reading DB:" });
  }
};
