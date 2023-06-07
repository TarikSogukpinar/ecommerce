import Product from "../../models/Product.js";
import createProductValidationSchema from "../../validations/productValidations/createProductValidationSchema.js";
import updateProductValidationSchema from "../../validations/productValidations/updateProductValidationSchema.js";
import searchProductValidationSchema from "../../validations/productValidations/searchProductValidationSchema.js";

const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.pageNumber) || 1;
    const pageSize = 20;
    const count = await Product.countDocuments();

    const allProducts = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort("-createdAt");
    res.json({
      products: allProducts,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

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

const updateProduct = async (req, res) => {
  try {
    const { error } = updateProductValidationSchema(req.body);

    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const productId = req.params.id;
    const updatedProductData = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found!" });
    }

    res.status(200).json({
      error: false,
      message: "Product updated successfully!",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    //search on progress

    const { error } = searchProductValidationSchema(req.query);

    if (error) {
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });
    }

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No products found matching the provided query parameters!",
      });
    }

    res.status(200).json({
      error: false,
      products: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};

export default { getAllProducts, createProduct, updateProduct, searchProducts };
