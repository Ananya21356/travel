import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  // Extract token from "Bearer <token>"
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}