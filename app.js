// import "./config/connection.js"; // side-effect
import { connect, connection, Schema, model } from "./config/connection.js";
import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";

import { User } from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", async (q, p) => {
  console.log("test..");
  const x = await User.find();
  p.send(x);
});

app.use(routes);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
