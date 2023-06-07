const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: 'None', //cross-site cookie
  maxAge: 60 * 60 * 24 * 1000,
}

export { cookieOptions }
