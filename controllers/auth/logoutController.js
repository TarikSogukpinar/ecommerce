import { StatusCodes } from 'http-status-codes'

const logoutUser = async (req, res) => {
  res
    .clearCookie('token')
    .status(StatusCodes.OK)
    .json({ message: 'Logout Successful.' })
}

export default { logoutUser }
