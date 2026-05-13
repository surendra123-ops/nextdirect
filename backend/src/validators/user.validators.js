import { body } from "express-validator";

export const updateProfileRules = [
  body("username")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage("Username must be 2–40 characters"),
  body("avatar").optional({ values: "falsy" }).isString().isLength({ max: 2048 }).withMessage("Avatar URL too long"),
  body("bio").optional({ values: "falsy" }).isString().isLength({ max: 500 }).withMessage("Bio must be at most 500 characters"),
];
