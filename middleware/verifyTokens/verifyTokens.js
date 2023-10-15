import jwt from 'jsonwebtoken'
import StatusCodes from 'http-status-codes'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ')[1]

    try {
      const user = jwt.verify(token, process.env.PRIVATE_KEY)
      req.user = user
      next()
    } catch (error) {
      console.error(error)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: true, message: 'Invalid Authentication.' })
    }
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: true, message: 'Invalid Authentication.' })
  }
}

export { verifyToken }
