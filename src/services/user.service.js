import mssql from "mssql";
import UserModel from "../models/user.model.js";
import Database from "./db.service.js";

export default class UserService extends Database {
  async Login(body) {
    try {
      let params = {
        CORREO: { type: mssql.VarChar, value: body.correo },
        CLAVE: { type: mssql.VarChar, value: body.clave },
      };

      let resultDb = await this.executeProcedure("SPLOGINUSUARIO", params);

      let result = resultDb.recordset[0];

      if (!result) {
        return -1;
      }

      let user = new UserModel();
      user.setId(result.USUARIOID);
      user.setNombre(result.NOMBRECOMPLETO);
      user.setCorreo(result.CORREO);
      user.setClave(result.CLAVE);

      // const cookiesOption = {
      //   expires: new Date(Date.now() + 10),
      //   httpOnly: true,
      // };

      return {
        id: user.getId(),
        nombre: user.getNombre(),
        correo: user.getCorreo(),
        clave: user.getClave(),
      };
    } catch (err) {
      console.log("Error during Login", err.message);
      throw new Error(err);
    }
  }

  async CreateUser(body) {
    try {
      //Validate body
      this.validateUserBody(body);

      //Set body of request
      let params = {
        NOMBRE: { type: mssql.VarChar, value: body.nombre },
        CORREO: { type: mssql.VarChar, value: body.correo },
        CLAVE: { type: mssql.VarChar, value: hashedPassword },
      };

      //Execute stored procedure
      let resultDb = await this.executeProcedure("SPINSERTARUSUARIO", params);

      //Extract results
      let result = resultDb.recordset;

      if (!result) {
        return -1;
      }

      //Get id by result of query
      let id = result[0][""];

      //Set user model
      let user = new UserModel();
      user.setId(id);
      user.setNombre(body.nombre);
      user.setCorreo(body.correo);

      //Return result if everything is ok
      return {
        id: user.getId(),
        nombre: user.getNombre(),
        correo: user.getCorreo(),
      };
    } catch (err) {
      console.log("Error in CreateUser", err.message);
      throw err;
    }
  }

  async ReadUsers() {
    try {
      //Execute stored procedure
      let resultDb = await this.executeProcedure("SPMOSTRARUSUARIOS");

      //Extract results
      let result = resultDb.recordset;

      if (!result) {
        return -1;
      }

      //Read information and mapping
      let users = result.map((data) => {
        let user = new UserModel();
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
      throw err;
    }
  }

  async UpdateUser(identity, body) {
    try {
      //Validate body
      this.validateUserBody(body);

      let id = parseInt(identity.id);
      //Set body of request
      let params = {
        USUARIOID: { type: mssql.Int, value: id },
        NOMBRE: { type: mssql.VarChar, value: body.nombre },
        CORREO: { type: mssql.VarChar, value: body.correo },
        CLAVE: { type: mssql.VarChar, value: body.clave },
      };

      // Execute stored procedure
      let resultDb = await this.executeProcedure("SPACTUALIZARUSUARIO", params);

      //Extract results
      let result = resultDb.recordset;

      if (!result) {
        return -1;
      }

      //Set user model
      let user = new UserModel();
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
      console.log("Error in UpdateUser", err.message);
      throw err;
    }
  }

  async DeleteUser(identity) {
    try {
      let id = parseInt(identity.id);

      //Set body of request
      let params = {
        USUARIOID: { type: mssql.Int, value: id },
      };

      // Execute stored procedure
      let resultDb = await this.executeProcedure("SPELIMINARUSUARIO", params);

      //Extract results
      let result = resultDb.rowsAffected[0];

      if (result === 0) {
        return -1;
      }

      //Return reuslts
      return {
        message: "User deleted successfully",
      };
    } catch (err) {
      console.log("Error in DeleteUser", err.message);
      throw err;
    }
  }

  validateUserBody(body) {
    if (!body.nombre || !body.correo || !body.clave) {
      throw new Error("Missing required fields");
    }
  }
}
