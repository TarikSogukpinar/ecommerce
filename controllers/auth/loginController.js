import User from '../../models/User.js'
import bcrypt from 'bcryptjs'
import loginValidationSchema from '../../validations/authValidations/loginValidationSchema.js'
import { cookieOptions } from '../../helpers/tokens/cookieOptions.js'
import { generateToken } from '../../helpers/tokens/generateToken.js'

const loginUser = async (req, res) => {
  try {
    const { error } = loginValidationSchema(req.body)
    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message })
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res
        .status(400)
        .json({ error: true, message: 'Email or password is wrong' })
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    )

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: true, message: 'Email or password is wrong' })
    }

    const token = await generateToken(user)

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
      data: user,
      message: 'Login Succesfully!',
      tokens: token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: true, message: error.message })
  }
}

export default { loginUser }
