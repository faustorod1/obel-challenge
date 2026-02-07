export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === process.env.AUTH_TOKEN) {
    next();
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
};