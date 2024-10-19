export default class UserModel {
  #id = -1;
  #nombre = null;
  #correo = null;
  #clave = null;

  //Getters
  get id() {
    return this.#id;
  }

  get nombre() {
    return this.#nombre;
  }

  get correo() {
    return this.#correo;
  }

  get clave() {
    return this.#clave;
  }

  //Setters
  set id(idNew) {
    if (typeof idNew === "number" && idNew > -1) {
      this.#id = idNew;
    } else {
      throw new Error("El id debe ser entero");
    }
  }

  set nombre(nombreNew) {
    if (typeof nombreNew === "string") {
      this.#nombre = nombreNew;
    } else {
      throw new Error("El nombre debe ser string");
    }
  }

  set correo(correoNew) {
    this.#correo = correoNew;
  }

  set clave(claveNew) {
    this.#clave = claveNew;
  }
}
