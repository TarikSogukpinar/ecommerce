const verifyRoles = (roleName) => {
  return (req, res, next) => {
    if (req.user.roles === roleName) {
      next();
    } else {
      return res
        .status(500)
        .json({ error: true, message: "You are not authorized!" });
    }
  };
};

export { verifyRoles };
