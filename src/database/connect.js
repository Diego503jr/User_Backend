import mssql from "mssql";

//DB's Settings
const settingConnetion = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  port: parseInt(process.env.MSSQL_PORT),
  database: process.env.MSSQL_NAME,
  options: {
    encrypt: false,
    trustServiceCertificate: true,
  },
};

//Establish db for exporting
export const connDb = async () => {
  try {
    await mssql.connect(settingConnetion);
  } catch (err) {
    console.log("Can't connect to DB", err.message);
  }
};
