import User from '../../models/User.js'
import { StatusCodes } from 'http-status-codes'

const getAllUsers = async (req, res) => {
  const page = Number(req.query.pageNumber) || 1
  const pageSize = 20
  const count = await User.countDocuments()

  const allUsers = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort('-createdAt')

  if (!allUsers) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'No users found!' })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    users: allUsers,
    page,
    pages: Math.ceil(count / pageSize),
    total: count,
  })
}

const getUserById = async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)

  if (user == null) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'User not found!' })
  }

  return res.status(StatusCodes.OK).json({ error: false, user: user })
}

export default { getAllUsers, getUserById }
