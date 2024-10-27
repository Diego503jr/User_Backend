import mssql from "mssql";
import UserModel from "../models/user.model.js";
import Database from "./db.service.js";

export default class UserService extends Database {
  async CreateUser(body) {
    try {
      //Set body of request
      const params = {
        NOMBRE: { type: mssql.VarChar, value: body.nombre },
        CORREO: { type: mssql.VarChar, value: body.correo },
        CLAVE: { type: mssql.VarChar, value: body.clave },
      };

      //Execute stored procedure
      const resultDb = await this.executeProcedure("SPINSERTARUSUARIO", params);

      //Extract results
      const result = resultDb.recordset;

      if (!result) {
        console.log("Can't create user");
        return;
      }

      //Get id by result of query
      const id = result[0][""];

      //Set user model
      const user = new UserModel();
      user.setId(id);
      user.setNombre(body.nombre);
      user.setCorreo(body.correo);
      user.setClave(body.clave);

      //Return result if everything is ok
      return {
        id: user.getId(),
        nombre: user.getNombre(),
        correo: user.getCorreo(),
        clave: user.getClave(),
      };
    } catch (err) {
      console.log("Error in CreateUser", err.message);
    }
  }

  async ReadUsers() {
    try {
      //Execute stored procedure
      const resultDb = await this.executeProcedure("SPMOSTRARUSUARIOS");

      //Extract results
      const result = resultDb.recordset;

      if (!result) {
        console.log("Can't read data");
        return;
      }

      //Read information and mapping
      let users = result.map((data) => {
        const user = new UserModel();
        user.setId(data.USUARIOID);
        user.setNombre(data.NOMBRECOMPLETO);
        user.setCorreo(data.CORREO);
        user.setClave(data.CLAVE);
        return {
          id: user.getId(),
          nombre: user.getNombre(),
          correo: user.getCorreo(),
          clave: user.getClave(),
        };
      });

      return users; //Resturn model
    } catch (err) {
      console.log("Error in ReadUser", err.message);
    }
  }

  async UpdateUser(identity, body) {
    try {
      //ParseInt id
      const id = parseInt(identity.id);

      //Set body of request
      const params = {
        USUARIOID: { type: mssql.Int, value: id },
        NOMBRE: { type: mssql.VarChar, value: body.nombre },
        CORREO: { type: mssql.VarChar, value: body.correo },
        CLAVE: { type: mssql.VarChar, value: body.clave },
      };

      // Execute stored procedure
      const resultDb = await this.executeProcedure(
        "SPACTUALIZARUSUARIO",
        params
      );

      //Extract results
      const result = resultDb.recordset;

      //Set user model
      const user = new UserModel();
      user.setId(id);
      user.setNombre(body.nombre);
      user.setCorreo(body.correo);
      user.setClave(body.clave);

      if (!result) {
        console.log("Can't update data");
        return;
      }

      //Return result if everything is ok
      return {
        id: user.getId(),
        nombre: user.getNombre(),
        correo: user.getCorreo(),
        clave: user.getClave(),
      };
    } catch (err) {
      console.log("Error in UpdateUser", err.message);
    }
  }

  async DeleteUser(identity) {
    try {
      //ParseInt id
      const id = parseInt(identity.id);

      //Set body of request
      const params = {
        USUARIOID: { type: mssql.Int, value: id },
      };

      // Execute stored procedure
      const resultDb = await this.executeProcedure("SPELIMINARUSUARIO", params);

      //Extract results
      const result = resultDb.rowsAffected;

      if (!result) {
        console.log("Can't delete data");
        return;
      }

      //Return reuslts
      return {
        message: "User deleted successfully",
      };
    } catch (err) {
      console.log("Error in DeleteUser", err.message);
    }
  }
}
