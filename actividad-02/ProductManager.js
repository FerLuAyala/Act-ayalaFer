const fs = require("fs/promises");
class ProductManager {
  path = "productos.json";
  products = [];

  constructor(products = []) {
    this.products = products;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");

      if (data.trim().length === 0) {
        this.products = [];
      } else {
        this.products = JSON.parse(data);
      }
    } catch (error) {
      console.log("Error al cargar productos:", error);
    }
  }

  async addProduct(nombre , precio , color) {
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
      precio: precio,
      color: color
    });

    await this.saveProducts();
  }

  async getProducts() {
    await this.loadProducts();
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
  async deleteProductByid(id) {
    //leo os productos 
    await this.loadProducts();   
   //buscamos el id
    const index =this.products.findIndex(p=> p.id==id);
    //eliminar
    if(index == -1){
      return 'NO se encontro Id para eliminar'
    } else {
      this.products.splice(index, 1);
      await this.saveProducts();
      return index;
    }
  }

  async updateProduct(id, newPrecio){
    await this.loadProducts();   
    const index =this.products.findIndex(p=> p.id==id);
     if(index == -1){
      return 'NO se encontro'
    } 
    this.products[index].precio = newPrecio;  
    await this.saveProducts();
    return index;

  }
}

module.exports = ProductManager;
