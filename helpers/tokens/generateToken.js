import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  try {
    const payload = {
      userId: user._id,
      roles: user.roles,
    }
    const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
      expiresIn: process.env.EXPIRE,
    })
    return accessToken
  } catch (error) {
    console.log(error)
  }
}
