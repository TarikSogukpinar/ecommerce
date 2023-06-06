import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import updatePasswordValidationSchema from "../../validations/authValidations/updatePasswordValidationSchema.js";

const updatePassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    const { id } = req.params;
    const { error } = updatePasswordValidationSchema(req.body);

    if (error) {
      res.status(400).json({ error: true, message: error.details[0].message });
    }
    const saltPassword = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, saltPassword);
    const hashConfirmPassword = await bcrypt.hashSync(
      confirmPassword,
      saltPassword
    );

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: true, message: error.message });
    }
    const oldPassword = await bcrypt.compareSync(password, user.password);
    const oldConfirmPassword = await bcrypt.compareSync(
      confirmPassword,
      user.confirmPassword
    );

    if (oldPassword) {
      return res.status(400).json({
        error: true,
        message: "New password cannot be the same as your old password",
      });
    }

    if (oldConfirmPassword) {
      return res.status(400).json({
        error: true,
        message: "New password cannot be the same as your old password",
      });
    }

    const data = await User.findByIdAndUpdate(
      id,
      {
        $set: { password: hashPassword, confirmPassword: hashConfirmPassword },
      },
      { new: true }
    );

    res.status(200).json({
      error: false,
      data: `User id: '${data._id}'`,
      message: `Password is updated for ${data.userName}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export default { updatePassword };
