const logoutUser = async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logout Successful.' })
}

export default { logoutUser }
