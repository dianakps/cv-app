const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-route");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument.options));

app.get("/", (req, res) => {
  res.send("running");
});

app.use(userRoutes);

async function connectDb() {
  await mongoose.connect(
    "mongodb+srv://admin:adminisdiana@cluster0.4wc3buw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { dbName: "finalProject" }
  );
}

connectDb().catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});
