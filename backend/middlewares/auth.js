const jwt = require("jsonwebtoken");

exports.requireAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Non authentifié" });

  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    if (decoded.role !== "admin") throw new Error();
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Non autorisé" });
  }
};