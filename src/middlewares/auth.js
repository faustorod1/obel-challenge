export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === '12345') {
    next();
  } else {
    res.status(401).json({ message: "No autorizado" });
  }
};