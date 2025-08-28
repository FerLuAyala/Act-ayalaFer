const ProductManager = require("./model/ProductManager");
const express = require("express");
//port de .env
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const app = express();
// Middleware para JSON
app.use(express.json());
// inicializacion de clase
const model = new ProductManager();

console.log("Mi api :)");

app.get("/", (request, response) => {
  response.send(`

    <h1>Soy una API 👋</h1>
    <ul>
      <li><a href="/api/products">Productos</a></li>
    </ul>
  `);
});

app.get("/api/products", async (request, response) => {
  try {
    const list = await model.getProducts();
    response.json(list);
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error al obtener productos" });
  }
});

app.get("/api/products/:id", async (request, response) => {
  const { id } = request.params;
  const data = await model.getProductById(id);
  if (data == "Not Found") {
    response.status(404).json({ msg: "Producto no encontrado" });
    return;
  }
  //console.log(id, typeof(id));
  response.json(data);
});

//agrego
app.post("/api/products", async (request, response) => {
  try {
    const prod = request.body;
    console.log(request.body);
    const { nombre, precio, color, stocks } = prod;
    if (!nombre || !precio || !color || !stocks) {
      response.status(400).json({ msg: "Faltan campos" });
      return;
    }
    const id = await model.addProduct(prod);
    response.status(200).json({ msg: "Producto guardado", id });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Tenemos un error" });
  }
});

//elimino

app.delete("/api/products/:id", async (request, response) => {
  const { id } = request.params;
  const data = await model.deleteProductByid(id);
  if (data == "Not Found") {
    response.status(404).json({ msg: "Producto no encontrado" });
    return;
  }
  response.json(data);
});

//actualizo
app.put("/api/products/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const pro = request.body;
    const { nombre, precio, color, stocks } = pro;
    if (!nombre || !precio || !color || !stocks) {
      response.status(400).json({ msg: "Faltan campos" });
      return;
    }
    
    const data = await model.updateProductById(id, pro);
    if (data == "Not Found") {
      response.status(404).json({ msg: "Producto no encontrado" });
      return;
    }
    response.json(data);
    console.table(data);
  } catch (error) {
    response.status(500).json({ msg: "Tenemos un error" });
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Servidor web en el puerto ${port}`);
});
