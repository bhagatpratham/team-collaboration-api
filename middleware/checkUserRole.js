module.exports = (roles) => {
  return (req, res, next) => {
    console.log("User Role:", req.user.role); // Check the user's role
    console.log("Allowed Roles:", roles); // Check the allowed roles
    if (req.user && roles.includes(req.user.role)) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
};
