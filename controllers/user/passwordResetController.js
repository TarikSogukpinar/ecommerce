import User from '../../models/User.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../../helpers/sendEmail/sendEmail.js'
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

export default { passwordReset }
