import express from "express";
import { ProductManager } from "./productManager.js";

const MU = new ProductManager("products.json");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get(["/", "/products"], async (req, res) => {
  const { limit } = req.query;

  let products = await MU.FindProduct();
  if (limit) {
    products = products.slice(0, limit);
  }

  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.status(400).send({ error: "Invalid product ID" });
    return;
  }

  const product = await MU.FindProductById(productId);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ error: "Product not found" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
