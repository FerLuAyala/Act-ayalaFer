const fs =require('fs/promises');
const path="README.md";
let texto=' #semana 01';

//procesos asincronicos
//primero lo leo
fs.readFile(path).then((data)=> {
    console.log('Lectura correcta');
    console.log(data.toString());
}).then(()=> {
//despues lo escribo
fs.writeFile(path, texto).then(()=>{
    console.log('Escritura correcta');
})

}).catch(error=> console.error(error));

