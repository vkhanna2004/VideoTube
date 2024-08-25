import { Router } from "express";
import { registerUser,loginUser,logoutUser } from "../controllers/user.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js" 
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured routes- that are only available when user is loggedin

router.route("/logout").post(verifyJWT,logoutUser); //first verifyJWT will be executed then logoutUser

export default router;
