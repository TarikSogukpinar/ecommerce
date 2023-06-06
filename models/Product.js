import moongose from "mongoose";
import moment from "moment";

const productSchema = new moongose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    inventory: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: String,
        review: String,
      },
    ],
    date: {
      type: Date,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = new moongose.model("Product", productSchema);

export default Product;
