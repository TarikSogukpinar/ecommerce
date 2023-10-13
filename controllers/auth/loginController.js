import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import loginValidationSchema from '../../validations/authValidations/loginValidationSchema.js'
import { cookieOptions } from '../../helpers/tokens/cookieOptions.js'
import { generateToken } from '../../helpers/tokens/generateToken.js'
import { StatusCodes } from 'http-status-codes'

const loginUser = async (req, res) => {
  const { error } = loginValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: 'Email or password is wrong' })
  }
  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password,
  )

  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: 'Email or password is wrong' })
  }

  const token = await generateToken(user)

  res.cookie('token', token, cookieOptions)

  return res.status(StatusCodes.OK).json({
    data: user,
    message: 'Login Successfully!',
    tokens: token,
  })
}

export default { loginUser }
