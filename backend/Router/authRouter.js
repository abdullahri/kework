import express from "express";
import { signup, signin, getAllUser } from "../Controller/AuthController.js" // Corrected import

const userAuth = express.Router();

// Create a user
userAuth.post("/signup", signup);

// Sign in
userAuth.post("/signin", signin);

// Get all users
userAuth.get("/getAllUser", getAllUser);

// Google Authentication (assuming this will be handled later)
userAuth.post("/google");

export default userAuth;
