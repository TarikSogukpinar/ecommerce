import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import registerValidationSchema from '../../validations/authValidations/registerValidationSchema.js'
import { StatusCodes } from 'http-status-codes'

const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body

  const { error } = registerValidationSchema(req.body)

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: error.details[0].message,
    })
  }

  const user = await User.findOne({ email })
  if (user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'You cannot register, Email already exist',
    })
  }

  const saltPassword = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, saltPassword)
  const hashConfirmPassword = await bcrypt.hash(confirmPassword, saltPassword)

  const data = new User({
    ...req.body,
    password: hashPassword,
    confirmPassword: hashConfirmPassword,
  })

  await data.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    data: data,
    message: 'Account Created Successfully!',
  })
}

export default { registerUser }
