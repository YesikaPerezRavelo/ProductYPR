import fs from "fs";

export class ProductManager {
  constructor(data) {
    this.data = data;
  }

  async addProduct(product) {
    const newProduct = {
      Id: product.Id ?? "Sin id",
      Title: product.Name ?? "Sin Nombre",
      Apellido: product.LastName ?? "Sin Apellido",
      Price: product.Price ?? "Sin Precio",
      Thumbnail: product.Thumbnail ?? "Sin imagen",
      Code: product.Code ?? "Sin codigo",
      Stock: product.Stock ?? "Sin stock",
    };

    const products = await this.FindProduct();
    products.push(newProduct);

    try {
      await fs.promises.writeFile(
        this.data,
        JSON.stringify(products, null, "\t")
      );
      console.log("Producto creado correctamente");
    } catch (e) {
      console.error("Error al crear el nuevo producto\n", e);
    }
  }

  async FindProduct() {
    try {
      const products = await fs.promises.readFile(this.data, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async FindProductById(id) {
    try {
      const products = await this.FindProduct();
      const product = products.find((product) => product.id == parseInt(id));
      return product || null;
    } catch (error) {
      console.error("Error buscando el producto por ID", error);
      return null;
    }
  }
}
