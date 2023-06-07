import Product from "../../models/Product.js";

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId }, // Burada hangi ürünün güncelleneceğini belirliyoruz.
      updatedProductData, // Bu, güncellemek istediğimiz veridir.
      { new: true } // Bu seçenek, güncelleme sonrası güncellenmiş belgeyi döndürür.
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

export default { updateProduct };
