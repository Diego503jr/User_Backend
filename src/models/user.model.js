export default class UserModel {
  #id = -1;
  #nombre = null;
  #correo = null;
  #clave = null;

  constructor() {
    this.#id = -1;
    this.#nombre = null;
    this.#correo = null;
    this.#clave = null;
  }

  //Getters
  getId() {
    return this.#id;
  }

  getNombre() {
    return this.#nombre;
  }

  getCorreo() {
    return this.#correo;
  }

  getClave() {
    return this.#clave;
  }

  //Setters
  setId(idNew) {
    if (typeof idNew === "number" && idNew > -1) {
      this.#id = idNew;
    } else {
      throw new Error("El id debe ser entero");
    }
  }

  setNombre(nombreNew) {
    if (typeof nombreNew === "string") {
      this.#nombre = nombreNew;
    } else {
      throw new Error("El nombre debe ser string");
    }
  }

  setCorreo(correoNew) {
    this.#correo = correoNew;
  }

  setClave(claveNew) {
    this.#clave = claveNew;
  }
}
