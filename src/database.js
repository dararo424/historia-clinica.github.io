import Dexie from 'dexie';

// Define la estructura de la base de datos y las tablas
class MyDatabase extends Dexie {
  constructor() {
    super('my-database');
    this.version(1).stores({
      pacientes: '++id, cedula, nombre, fechaIngreso, personaResponsable, medicamentosFormulados, alergicoA',
      notasDiarias: '++id, cedula, fecha, observaciones, notaDeObservacion',
    });
  }
}

// Exporta una instancia de la base de datos
const db = new MyDatabase();
export default db;
