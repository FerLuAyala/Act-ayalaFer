const fs = require("fs/promises");
class ProductManager {
  path = "productos.json";
  products = [];

  constructor(products = []) {
    this.products = products;
  }

  async addProduct(nombre) {
    const id = crypto.randomUUID();
    this.products.push({
      id: id,
      nombre: nombre.toUpperCase(),
    });
    await this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  async saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.path, data);
  }

  getProductNombre(nombre) {
    const product = this.products.find((p) => p.nombre === nombre.toUpperCase());
    if (!product) {
      console.log("No hay");
      return {};
    }
    return product;
  }
  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("No hay");
      return {};
    }
    return product;
  }
}

module.exports = ProductManager;
