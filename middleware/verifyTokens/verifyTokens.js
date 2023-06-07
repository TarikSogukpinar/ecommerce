import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res
      .status(403)
      .json({ error: true, message: 'Invalid Authentication.' })
  }
  try {
    const user = jwt.verify(token, process.env.PRIVATE_KEY)
    req.user = user

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: true, message: error.message })
  }
}

export { verifyToken }
