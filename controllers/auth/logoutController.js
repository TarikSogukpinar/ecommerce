const logoutUser = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logout Successful." });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

export default { logoutUser };
