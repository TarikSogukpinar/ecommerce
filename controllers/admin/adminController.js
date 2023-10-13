import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import updateUserRoleValidationSchema from '../../validations/adminValidations/updateUserRoleValidationSchema.js'
import updateUserByIdValidationSchema from '../../validations/adminValidations/updateUserByIdValidationSchema.js'
import createNewUserValidationSchema from '../../validations/adminValidations/createNewUserValidationSchema.js'

const createNewUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body

  const { error } = createNewUserValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const checkUserEmailExist = await User.findOne({ email })

  if (checkUserEmailExist) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'User creation failed! Email already exist',
    })
  }

  const saltPassword = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, saltPassword)
  const hashConfirmPassword = await bcrypt.hash(confirmPassword, saltPassword)

  const newUser = new User({
    ...req.body,
    password: hashPassword,
    confirmPassword: hashConfirmPassword,
  })

  await newUser.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'User created successfully!',
    newUser: newUser,
  })
}

const getAllUsers = async (req, res) => {
  /* #swagger.security = [{
           "apiKeyAuth": []
   }] */
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

const updateUserById = async (req, res) => {
  const { error } = updateUserByIdValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const id = req.params.id
  const updatedUserData = req.body

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    updatedUserData,
    { new: true },
  )

  if (!updatedUser) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'User not found!' })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'User updated successfully!',
    updateUser: updatedUser,
  })
}

const deleteUserById = async (req, res) => {
  const id = req.params.id
  const user = await User.findByIdAndDelete(id)

  if (user) {
    return res
      .status(StatusCodes.OK)
      .json({ error: false, message: 'User deleted successfully!' })
  }

  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ error: true, message: 'User not found!' })
}

const updateUserRole = async (req, res) => {
  const { roles } = req.body

  const { error } = updateUserRoleValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: true,
      message: 'User not found!',
    })
  }

  if (user.roles === roles) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'New role is the same as the current role.',
    })
  }

  user.roles = roles

  const updatedUser = await user.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'User role updated successfully!',
    updatedUser: updatedUser,
  })
}

export default {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserRole,
}
