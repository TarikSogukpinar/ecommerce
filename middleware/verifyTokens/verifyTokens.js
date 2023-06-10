import jwt from 'jsonwebtoken'
import StatusCodes from 'http-status-codes'

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: true, message: 'Invalid Authentication.' })
  }
  try {
    const user = jwt.verify(token, process.env.PRIVATE_KEY)
    req.user = user

    next()
  } catch (error) {
    console.log(error)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: error.message })
  }
}

export { verifyToken }
