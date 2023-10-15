const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none', //cross-site cookie
  maxAge: 60 * 60 * 24 * 1000,
}

export { cookieOptions }
