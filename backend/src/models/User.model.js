import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { AuthProvider } from "../constants/auth.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
      default: null,
    },
    avatar: {
      type: String,
      default: "",
      maxlength: 2048,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },
    refreshToken: {
      type: String,
      select: false,
      default: null,
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true,
    },
    authProvider: {
      type: String,
      enum: [AuthProvider.LOCAL, AuthProvider.GOOGLE],
      default: AuthProvider.LOCAL,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPasswordIfNeeded() {
  if (!this.isModified("password") || !this.password) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  if (!this.password) return false;
  return bcrypt.compare(candidate, this.password);
};

userSchema.methods.toSafeJSON = function toSafeJSON() {
  const o = this.toObject({ versionKey: false });
  delete o.password;
  delete o.refreshToken;
  return o;
};

export const User = mongoose.model("User", userSchema);
