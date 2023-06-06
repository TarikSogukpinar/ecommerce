import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import passwordResetValidationSchema from "../../validations/userValidations/passwordResetValidationSchema.js";

const passwordReset = async (req, res) => {
  try {
    const { error } = passwordResetValidationSchema(req.body);
    
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .send({ message: "User with given email does not exist!" });
    }
    const secret = process.env.PRIVATE_KEY + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });

    const url = `http://localhost:3000/password-reset/${user._id}/${token}/`;
    await sendEmail(user.email, "Password Reset", url);

    res.status(200).send({
      error: false,
      message: "Password reset link sent to your email account",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: true, message: error.message });
  }
};

export default { passwordReset };
