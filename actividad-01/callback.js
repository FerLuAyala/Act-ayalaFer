const fs = require("fs");
const path = "README.md";

//leer archivo
fs.readFile(path, (err, data) => {
  if (err) {
    console.error("Ocurrio un error");
  } else {
    console.log("Lectura de archivo");
    const texto = "#Semana 01 - BOde basico";
    //escribir archivo
    fs.writeFile(path, texto, function (err) {
      if (err) {
        console.error("Ocurrio un error");
      } else {
        console.log("Escritura correcta");
      }
    });
    console.log(data.toString());
  }
});
