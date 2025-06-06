const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const ticketController = require("../controllers/ticketController");
const { requireAdmin } = require("../middlewares/auth");

// Inscription admin
router.post("/register", adminController.adminRegister);

// Connexion admin
router.post("/login", adminController.adminLogin);

// Liste des tickets en attente (admin)
router.get("/tickets", requireAdmin, adminController.listPendingTickets);

// Valider/refuser un ticket
router.patch("/tickets/:id", requireAdmin, ticketController.updateTicketStatus);

module.exports = router;