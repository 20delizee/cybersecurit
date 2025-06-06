const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const ticketsRouter = require("./routes/tickets");
const adminRouter = require("./routes/admin");
const { swaggerSpec } = require("./swagger");

dotenv.config();

const app = express();

// Middlewares globaux
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/cyberguardian";
mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => {
    console.error("Erreur de connexion MongoDB :", err);
    process.exit(1);
  });

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API
app.use("/api/tickets", ticketsRouter);
app.use("/api/admin", adminRouter);

// Page de test (optionnel)
app.get("/", (req, res) => {
  res.send("CyberGuardian API is running 🚨");
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

// Lancement du serveur HTTP
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs on http://localhost:${PORT}/api-docs`);
});