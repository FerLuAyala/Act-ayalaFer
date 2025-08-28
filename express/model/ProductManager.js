const fs = require("fs/promises");
class ProductManager {
  path = "./data/productos.json";
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

  async addProduct({nombre , precio , color, stocks}) {
    await this.loadProducts();
    if (!nombre || typeof nombre !== 'string') {
    throw new Error('El nombre es obligatorio y debe ser texto');
  }

  const nombreMayus = nombre.toUpperCase();

  if (this.products.some(p => p.nombre === nombreMayus)) {
    console.log(`El producto "${nombreMayus}" ya existe`);
    return;
  }
    const id = crypto.randomUUID();
    this.products.push({
      id: id,
      nombre: nombreMayus,
      precio: precio,
      color: color,
      stocks: stocks
    });

    await this.saveProducts();
    return id;
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
      console.log('Not Found');
      return 'Not Found'
    }
    return product;
  }
  async deleteProductByid(id) {
    //leo los productos 
    await this.loadProducts();   
   //buscamos el id
    const index =this.products.findIndex(p=> p.id==id);
    //eliminar
    if(index == -1){
      return 'Not Found'
    } else {
      this.products.splice(index, 1);
      await this.saveProducts();
      return index;
    }
  }

  async updateProductById(id, product  ){
    await this.loadProducts();   
    const index =this.products.findIndex(p=> p.id==id);
     if(index == -1){
      return 'Not Found'
    } else {
             this.products[index].precio = product.precio;  
            this.products[index].nombre = product.nombre;
            this.products[index].color = product.color;
            this.products[index].stocks = product.stocks;
            await this.saveProducts();
            return id;
        }
   

  }
}

module.exports = ProductManager;
