import express from "express";
import { ProductManager } from "./productManager.js";

const MU = new ProductManager("products.json");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { limit } = req.query;

  let products = await MU.FindProduct();
  if (limit) {
    products = products.slice(0, limit);
  }

  res.send(products);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
