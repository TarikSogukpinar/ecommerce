export const tryCatch = (controller) => async (req, res, next) => {
  try {
    return await controller(req, res)
  } catch (error) {
    return next(error)
  }
}
