const fs = require("fs/promises");
const path = "README.md";
let texto = " #semana 01";

//async function lectura(path) {}

const lectura = async (path) => {
   try {
      const data = await fs.readFile(path);
  console.log("Lectura correcta");
  console.log(data.toString());

  await fs.writeFile(path, texto);
  console.log("Escritura correcta");
   } catch (error) {
    console.log(`Tenemos un error ${error}`);
   }

};

lectura(path);
