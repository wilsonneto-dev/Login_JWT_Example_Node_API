const express = require("express");
const cors = require("cors");

const dotenv = require("./config/dotenv");
const routes = require("./routes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(routes);

// rodar o server
const port = process.env.PORT || 3333;
app.listen(process.env.PORT, () => {
  console.log(`servidor rodando na porta: ${port}`);
});
