
const http= require('http');
const port = 3001;
const server = http.createServer( (request, response) => {
    const url = request.url;
    const method = request.method;
    
    console.log(url, method);
    if( url == '/'){
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('<h1>Hola desde Node!</h1>');
    } else if ( url == '/users'){
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end('JSON');
    } else if ( url == '/products'){
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end('Productos');
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.end('<h1>404 | Not Found</h1>');
    }

});

server.listen( port, () => {
    console.log(`Servidor Web en el puerto ${port}`);
})


//crud 

const ProductManager = require("./ProductManager");
const p1 = new ProductManager();
async function saveProducts() {
  //espera que se agregan todos los products y luego los guarda
  await p1.addProduct("Plancha" , 5000 , "rosa");
  await p1.addProduct("Heladera" , 600 , "gris ");
  await p1.addProduct("Microondas" , 7800, "negro");
}


async function accionesProduct() {
  await saveProducts();
  console.log("Productos guardados");
  const data =  await p1.getProducts();
  console.table(data);
  const producto = await p1.getProductById(
    "5c792205-9483-47fb-b5c7-e239e4ff457c"
  ); 
   console.log("producto encontrado");
  console.table(producto);

  const actualizado = await p1.updateProduct("5c792205-9483-47fb-b5c7-e239e4ff457c" , precio= 20800);
  console.log("producto actualizado");
  console.table(actualizado);
  const dataN = await p1.getProducts();
  console.table(dataN);
  const eliminado =await p1.deleteProductByid("6cd2da09-36e2-46cb-9484-108bf42db3a1");
  console.log(eliminado);
  
}



accionesProduct();

