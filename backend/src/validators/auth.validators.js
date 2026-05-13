import { body } from "express-validator";

export const registerRules = [
  body("username").trim().isLength({ min: 2, max: 40 }).withMessage("Username must be 2–40 characters"),
  body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").isLength({ min: 8, max: 128 }).withMessage("Password must be at least 8 characters"),
];

export const loginRules = [
  body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").isString().notEmpty().withMessage("Password required"),
];

export const googleRules = [body("idToken").isString().notEmpty().withMessage("idToken required")];
