const User = require("../models/User");
const Ticket = require("../models/Ticket");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Inscription admin (register)
exports.adminRegister = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Champs requis manquants" });
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: "Nom d'utilisateur déjà utilisé" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.status(201).json({ message: "Admin créé avec succès", user: { username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l'inscription", details: err });
  }
};

// Connexion admin (login)
exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Identifiant/mot de passe incorrect" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Identifiant/mot de passe incorrect" });

  // Générer un JWT
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET || "changeme",
    { expiresIn: "12h" }
  );
  res.json({ token });
};

// Liste tickets à valider (admin)
exports.listPendingTickets = async (req, res) => {
  const tickets = await Ticket.find({ status: "pending" }).sort({ createdAt: -1 });
  res.json({ tickets });
};