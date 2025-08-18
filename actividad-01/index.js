const Alumno =require('./Alumno');

const alumnoUno = new Alumno("Fernanada" , "Ayala" , 31 , "Diseño y programación Web");
console.log(alumnoUno.obtenerCarrera());
console.log(alumnoUno.obtenerDatos());
alumnoUno.modificarEdad(32);
console.log(`La edad es ${alumnoUno.retornarEdad()}`);
alumnoUno.agregarMateria('Aplicaciones Hibridas');
alumnoUno.agregarMateria('Programacion II');
alumnoUno.agregarMateria('Etica');
const data=alumnoUno.mostrarMaterias();
console.table(data);


