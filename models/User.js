import moongose from "mongoose";
import moment from "moment";

const userSchema = new moongose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    roles: { type: String, default: "user", enum: ["user", "admin"] },
    createdAt: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    },
  },
  { timestamps: true, versionKey: false }
);

const User = new moongose.model("user", userSchema);

export default User;
