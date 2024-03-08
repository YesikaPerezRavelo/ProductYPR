import express from "express";
import { ProductManager } from "./productManager.js";

const PM = new ProductManager("./data/products.json");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/products", async (req, res) => {
  res.send(await PM.GetAllProducts());
});

app.get("/api/products/:oid", async (req, res) => {
  const oid = req.params.oid;
  const products = await PM.GetAllProducts();
  const product = products.find((p) => p.id == oid);

  if (!product) {
    res.status(404).send("Product not found");
  } else {
    res.json(product);
  }
});

app.post("/api/products", async (req, res) => {
  const response = await PM.AddProduct(req.body);
  res.status(201).send(response);
});

app.put("/api/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await PM.UpdateProduct(pid, req.body));
});

app.delete("/api/products/:pid", async (req, res) => {
  const pid = req.params.pid;
  res.send(await PM.DeleteProduct(pid));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor activo http://localhost:${PORT}`);
});
