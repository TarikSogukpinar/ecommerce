import Category from '../../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import searchCategoryValidationSchema from '../../validations/categoryValidations/searchCategoryValidationSchema.js'
import createCategoryValidationSchema from '../../validations/categoryValidations/createCategoryValidationSchema.js'

const createCategory = async (req, res) => {
  const { error } = createCategoryValidationSchema(req.body)

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  const categoryExists = await Category.findOne({
    categoryName: req.body.categoryName,
  })

  if (categoryExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: true,
      message: 'Category already exists!',
    })
  }

  const category = new Category({
    categoryName: req.body.categoryName,
    categoryDescription: req.body.categoryDescription,
  })

  const savedCategory = await category.save()

  return res.status(StatusCodes.OK).json({
    error: false,
    message: 'Category Created Succesfully!',
    savedCategory: savedCategory,
  })
}

const searchCategory = async (req, res) => {
  const { error } = searchCategoryValidationSchema(req.body)
  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: true, message: error.details[0].message })
  }

  let category = await Category.find({
    $or: [
      { categoryName: { $regex: new RegExp(req.params.key, 'i') } },
      { categoryDescription: { $regex: new RegExp(req.params.key, 'i') } },
    ],
  })

  if (category.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        error: true,
        message: 'No category found matching the provided query parameters!!',
      })
  }

  return res.status(StatusCodes.OK).json({
    error: false,
    category: category,
  })
}

export default { createCategory, searchCategory }
