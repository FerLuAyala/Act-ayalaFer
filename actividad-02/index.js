const ProductManager = require("./ProductManager");
const p1 = new ProductManager();

async function saveProducts() {
//espera que se agregan todos los products y luego los guarda
  await p1.addProduct("Cocina");
  await p1.addProduct("Heladera");
  await p1.addProduct("Microondas");
}
saveProducts().then((r) => {
  console.log("guardado");
  const data = p1.getProducts();
  console.table(data);
});

console.log("Tu producto", p1.getProductNombre("cocina"));
console.log("Tu id " , p1.getProductById ("ddd"));