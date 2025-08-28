const ProductManager = require("./ProductManager");
const chalk =require('chalk');
//servidor con express
const express= require('express');
const port= 3003;

const server= express();
//colorea la terminal 
console.log(chalk.green ("api rest"));

const productManager = new ProductManager();

server.get( '/' ,( request, response) => {
    response.send('Hola desde express')
})
//permanece escuchando

server.get('/productos', async (request, response) => {
  const list = await productManager.getProducts();
console.table(list);
response.json(list);

})

// '/:ruta es una ruta dinamica'
server.get('/products/:id', async ( request, response) => {
    //pasar parametros del cliente al backend    
    //console.log(request.params.id); 
    const id = request.params.id;

    const data = await productManager.getProductById(id);
    console.log(data);
    response.json(data);
})

server.listen( port, () => {
    console.log(chalk.blue(`servidor en el puerto ${port}`));
})

