import Joi from "joi";

const createProductValidationSchema = (body) => {
  const schema = Joi.object({
    productName: Joi.string().required().min(5).max(255).label("Product Name"),
    description: Joi.string().required().min(5).max(255).label("Description"),
    price: Joi.number().required().min(0).label("Price"),
    category: Joi.string().required().min(5).max(255).label("Category"),
    brand: Joi.string().required().min(2).max(255).label("Brand"),
    inStock: Joi.boolean().required().label("In Stock"),
    inventory: Joi.number().integer().required().min(0).label("Inventory"),
    rating: Joi.number().required().min(0).max(5).label("Rating"),
    reviews: Joi.array()
      .items(
        Joi.object({
          userId: Joi.string().required(),
          review: Joi.string().required(),
          rating: Joi.number().min(0).max(5),
        })
      )
      .label("Reviews"),
  });
  return schema.validate(body);
};

export default createProductValidationSchema;
