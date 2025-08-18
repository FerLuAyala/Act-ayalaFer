const ProductManager = require("./ProductManager");
const p1 = new ProductManager();

async function saveProducts() {
  //espera que se agregan todos los products y luego los guarda
  await p1.addProduct("Plancha");
  await p1.addProduct("Heladera");
  await p1.addProduct("Microondas");
}


async function accionesProduct() {
  await saveProducts();
  console.log("Productos guardados");
  const data = p1.getProducts();
  console.table(data);
  const producto = await p1.getProductById(
    "37badfd9-8169-4824-9851-1e32d412f9ae"
  );
  console.log("id encontrado:");
  console.table(producto);
}

accionesProduct();
