import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};
// middleware for password encryption
userSchema.pre("save", async function (next) {
  // should only run on new user and not when we updated name,etc.
  //  so new salt should not be generated
  if (!this.isModified("password")) next();

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
