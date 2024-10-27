import mssql from "mssql";
import { connDb } from "../database/connect.js";

export default class Database {
  constructor() {
    this.connection = null;
  }

  //Open connection
  async openConnection() {
    if (!this.connection) {
      this.connection = await connDb();
    }
  }

  //Methods execution
  async executeProcedure(procedureName, params = {}) {
    try {
      await this.openConnection();
      const request = new mssql.Request();

      if (params) {
        //Add parameters if there are
        for (const key in params) {
          const { type, value } = params[key];
          request.input(key, type, value);
        }
      }

      //Execute query
      const result = await request.execute(procedureName);

      //Return results
      console.log(result);

      return result;
    } catch (err) {
      console.log(`Error executing procedure ${procedureName}`, err.message);
    }
  }

  //Close connection
  async closeConnection() {
    if (this.connection) {
      await mssql.close();
      this.connection = null;
    }
  }
}
