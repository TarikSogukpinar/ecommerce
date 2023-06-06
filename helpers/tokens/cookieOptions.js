const now = new Date();
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "development" ? false : true,
  sameSite: "None", //cross-site cookie
  maxAge: 60 * 60 * 24 * 1000,
  expires: new Date(now.getTime() + 60000),
};
  
  export { cookieOptions };