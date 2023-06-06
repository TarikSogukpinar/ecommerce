import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import registerValidationSchema from "../../validations/authValidations/registerValidationSchema.js";

const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const { error } = registerValidationSchema(req.body);

    if (error) {
      res.status(400).json({ error: true, message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: true,
        message: "You cannot register, Email already exist",
      });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);
    const hashConfirmPassword = await bcrypt.hash(
      confirmPassword,
      saltPassword
    );

    const data = new User({
      ...req.body,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
    });

    await data.save();

    res.status(200).json({
      error: false,
      data: data,
      message: "Account Created Succesfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export default { registerUser };
