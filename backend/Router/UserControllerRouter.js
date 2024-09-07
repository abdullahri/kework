import express from "express";

import { UserController } from "../Controller/UserController.js";

const userDefine = express.Router()

// create a user
userDefine.post("/userdefine", UserController)
export default userDefine