const Ticket = require("../models/Ticket");

// Créer un signalement
exports.createTicket = async (req, res) => {
  const { url, category, danger, description } = req.body;
  try {
    const ticket = await Ticket.create({ url, category, danger, description });
    res.status(201).json({ message: "Signalement enregistré", ticket });
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la création du ticket", details: err });
  }
};

// Liste des tickets (avec filtrage)
exports.listTickets = async (req, res) => {
  const { status, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) filter.url = { $regex: search, $options: "i" };

  const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
  res.json({ tickets });
};

// Détail d’un ticket
exports.getTicketById = async (req, res) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);
  if (!ticket) return res.status(404).json({ error: "Ticket non trouvé" });
  res.json(ticket);
};

// Admin: valider/refuser un ticket
exports.updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["valid", "refused"].includes(status)) return res.status(400).json({ error: "Statut invalide" });
  const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
  if (!ticket) return res.status(404).json({ error: "Ticket non trouvé" });
  res.json({ message: "Ticket mis à jour", ticket });
};