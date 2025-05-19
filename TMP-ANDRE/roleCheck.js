export const checkRole = (roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!roles.includes(user.role)) return res.status(403).send("Access Denied");
    next();
  };
};
