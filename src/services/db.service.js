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

      //Add parameters if there are
      for (const key in params) {
        const { type, value } = params[key];
        request.input(key, type, value);
      }

      //Execute query
      const result = await request.execute(procedureName);

      //Return results
      return result;
    } catch (err) {
      console.log(`Error executing procedure ${procedureName}`, err.message);
      throw err;
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
