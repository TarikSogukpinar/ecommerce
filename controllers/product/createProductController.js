import Product from "../../models/Product.js";
import createProductValidationSchema from "../../validations/productValidations/createProductValidationSchema.js";

const createProduct = async (req, res) => {
  try {
    const { error } = createProductValidationSchema(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }
   
    req.body.userId = req.user.userId;
    const product = new Product(req.body);

    const savedProduct = await product.save();

    res.status(200).json({
      error: false,
      message: "Product Created Succesfully!",
      savedProduct: savedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export default { createProduct };
