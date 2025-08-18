class Alumno {
nombre = "";
apellido= "";
carrera="";
materias=[];


  constructor(nombre, apellido, edad, carrera, materias = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.carrera = carrera;
    this.materias = materias;
  }

  //metodos

  obtenerCarrera() {
    
    return this.carrera;
  }

  obtenerDatos() {
    return `Nombre ${this.nombre} | apellido ${this.apellido}`;
  }

  modificarEdad(edad) {
    this.edad = edad;
  }

  agregarMateria(materia) {
    this.materias.push(materia);
  }

  mostrarMaterias() {
    return this.materias;
  }

  retornarEdad() {
    return this.edad;
  }
}

module.exports = Alumno;
