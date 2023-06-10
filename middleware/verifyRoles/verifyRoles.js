import { StatusCodes } from 'http-status-codes'

const verifyRoles = (roleName) => {
  return (req, res, next) => {
    if (req.user.roles === roleName) {
      next()
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: true, message: 'You are not authorized!' })
    }
  }
}

export { verifyRoles }
