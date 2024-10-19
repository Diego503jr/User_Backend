import mssql from "mssql";
import { connDb } from "../../db/connect.js";

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
  async executeProcedure(procedureName, inputs = []) {
    try {
      await this.openConnection();
      const request = new mssql.Request();

      //Add parameters if there are
      inputs.forEach((input) => {
        request.input(input.name, input.type, input.value);
      });

      //Execute query
      const result = await request.execute(procedureName);
      return result.recordset;
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
