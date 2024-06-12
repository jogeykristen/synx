const adminRoleMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
  next();
};

const userRoleMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ error: "Forbidden: Users only" });
  }
  next();
};

const adminOrUserRoleMiddleware = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "user") {
    return res.status(403).json({ error: "Forbidden: Admins or Users only" });
  }
  next();
};

module.exports = {
  adminRoleMiddleware,
  userRoleMiddleware,
  adminOrUserRoleMiddleware,
};
