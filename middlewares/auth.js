const jwt = require("jsonwebtoken");

//AUTH USER
// ======================
exports.authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Accès réservé aux utilisateurs" });
    }

    req.user = decoded; // on stocke les infos user
    next();

  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};


// ======================
// 🔐 AUTH ADMIN
// ======================
exports.authAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Accès réservé aux administrateurs" });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};