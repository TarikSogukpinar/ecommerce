import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import updatePasswordValidationSchema from '../../validations/userValidations/updatePasswordValidationSchema.js'
import { StatusCodes } from 'http-status-codes'

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

export default { updatePassword }
