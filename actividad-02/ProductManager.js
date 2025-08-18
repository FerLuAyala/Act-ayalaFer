const fs = require("fs/promises");
class ProductManager {
  path = "productos.json";
  products = [];

  constructor(products = []) {
    this.products = products;
  }

  
  async loadProducts() {
    try {
      const data = await fs.readFile(this.path);
      if (data) {
        this.products = JSON.parse(data);
      } else {
        this.products = [];
      }
    } catch (error) {}
  }
  
  async addProduct(nombre) {
    await this.loadProducts();
    const nombreMayus = nombre.toUpperCase();
    if (this.products.some((p) => p.nombre === nombreMayus)) {
      console.log(`El producto "${nombreMayus}" ya existe`);
      return;
    }
    const id = crypto.randomUUID();
    this.products.push({
      id: id,
      nombre: nombreMayus,
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

  async getProductById(id) {
    await this.loadProducts();
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      console.log("No hay el id");
      return {};
    }
    return product;
  }
}

module.exports = ProductManager;
