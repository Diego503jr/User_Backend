import UserModel from "../models/userModel.js";
import Database from "./dbService.js";

export default class UserService extends Database {
  async CreateUser(user) {
    try {
      //Read information if there are
      const inputs = [
        { name: "NOMBRECOMPLETO", type: mssql.Varchar, value: user.nombre },
        { name: "CORREO", type: mssql.Varchar, value: user.correo },
        { name: "CLAVE", type: mssql.Varbinary, value: user.clave },
      ];

      //Execute stored procedure
      await this.executeProcedure("SPINSERTARUSUARIO", inputs);
      console.log("User created successfully");
    } catch (err) {
      console.log("Error in CreateUser", err.message);
    }
  }

  async ReadUsers() {
    try {
      const result = await this.executeProcedure("SPMOSTRARUSUARIOS");

      //Read information and mapping
      let userModel = result.map((data) => {
        const user = new UserModel();
        user.id = data.USUARIOID;
        user.nombre = data.NOMBRECOMPLETO;
        user.correo = data.CORREO;
        user.clave = data.CLAVE;
        return {
          id: user.id,
          nombre: user.nombre,
          correo: user.correo,
          clave: user.clave,
        };
      });

      return userModel; //Resturn model
    } catch (err) {
      console.log("Error in ReadUser", err.message);
    }
  }

  async UpdateUser(id) {}

  async DeleteUser(id) {}
}
