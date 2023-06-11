import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import sendEmail from '../../helpers/sendEmail/sendEmail.js'
import updatePasswordValidationSchema from '../../validations/userValidations/updatePasswordValidationSchema.js'
import passwordResetValidationSchema from '../../validations/userValidations/passwordResetValidationSchema.js'
import { StatusCodes } from 'http-status-codes'

const passwordReset = async (req, res) => {
  const { error } = passwordResetValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: error.details[0].message })
  }
  const user = User.findOne({ email: req.body.email })

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: 'User with given email does not exist!' })
  }
  const secret = process.env.PRIVATE_KEY + user.password
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '5m',
  })

  const url = `http://localhost:5000/password-reset/${user._id}/${token}/`
  await sendEmail(user.email, 'Password Reset', url)

  res.status(StatusCodes.OK).send({
    error: false,
    message: 'Password reset link sent to your email account',
  })
}

const updatePassword = async (req, res) => {
  const { password, confirmPassword } = req.body
  const { id } = req.params
  const { error } = updatePasswordValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }
  const saltPassword = await bcrypt.genSaltSync(10)
  const hashPassword = await bcrypt.hashSync(password, saltPassword)
  const hashConfirmPassword = await bcrypt.hashSync(
    confirmPassword,
    saltPassword,
  )

  const user = await User.findById(id)

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'User Id Not Found!' })
  }

  const oldPassword = await bcrypt.compareSync(password, user.password)
  const oldConfirmPassword = await bcrypt.compareSync(
    confirmPassword,
    user.confirmPassword,
  )

  if (oldPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'New password cannot be the same as your old password',
    })
  }

  if (oldConfirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'New password cannot be the same as your old password',
    })
  }

  const data = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        password: hashPassword,
        confirmPassword: hashConfirmPassword,
      },
    },
    { new: true },
  )

  res.status(StatusCodes.OK).json({
    error: false,
    data: `User id: '${data._id}'`,
    message: `Password is updated for ${data.firstName} ${data.lastName}`,
  })
}

const userAccountDeleted = async (req, res) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id)

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: true, message: 'User not found' })
  }

  return res
    .status(StatusCodes.OK)
    .json({ error: false, message: 'User deleted' })
}

export default { passwordReset, updatePassword, userAccountDeleted }
