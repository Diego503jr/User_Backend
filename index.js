import app from "./src/app.js";

app.listen(app.get("port"), (err) => {
  if (err) {
    console.log(`Something was wrong: ${err}`);
  } else {
    console.log(`Server running on: http://localhost:${app.get("port")}`);
  }
});
