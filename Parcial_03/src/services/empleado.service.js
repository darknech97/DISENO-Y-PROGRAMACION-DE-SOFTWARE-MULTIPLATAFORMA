import firebase from "../firebase";

const db = firebase.ref("/empleados");

class EmpleadoDataService {
  getAll() {
    return db;
  }

  create(empleado) {
    return db.push(empleado);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new EmpleadoDataService();