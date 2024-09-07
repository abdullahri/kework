// import User from "../models/User.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs';
// import { createError } from "../error.js"
import fs from "fs";
const filePath = './users.json'
const readUsersFromFile = () => {
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const user = JSON.parse(fileData);

            // Ensure users is an array
            if (Array.isArray(user)) {
                return user;
            } else {
                // If the file does not contain an array, return an empty array
                return [];
            }
        } catch (error) {
            // If there is an error parsing JSON, return an empty array
            console.error("Error reading or parsing users.json:", error);
            return [];
        }
    }
    return [];
};

// Helper function to write users to the file
const writeUsersToFile = (user) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(user
            , null, 2));
    } catch (error) {
        console.error("Error writing to users.json:", error);
    }
};

// let users = []
export const signup = async (req, res, next) => {
    const user = readUsersFromFile()
    // const user = req.body
    // users.push(user)
    try {
        // Ensure password is provided
        const { Password, Role, ...userData } = req.body;

        if (!Password) {
            return res.status(400).json({ error: 'Password is required' });
        } else if (!Role) {
            return res.status(400).json({ error: 'Roles must be define' });
        }


        // Generate salt and hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(Password, salt);

        // Create new user with hashed password
        const newUser = new User({ ...userData, Password: hash, Role });
        // await newUser.save();
        user.push(newUser);
        writeUsersToFile(user)

        res.status(200).send('User has been created');
    } catch (err) {
        next(err);
    }
};


// const usersFilePath = path.join(__dirname, './users.json');

export const signin = async (req, res, next) => {
    try {
        // Read users from the file
        const data = fs.readFileSync(filePath, 'utf-8');
        const users = JSON.parse(data);

        // Find the user
        const user = users.find(u => u.name === req.body.name);
        if (!user) return res.status(404).json({ message: "User not found!" });

        // Compare passwords
        // const isCorrect = await bcrypt.compare(req.body.Password, user.Password);
        // if (!isCorrect) return res.status(400).json({ message: "Wrong credentials!" });

        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT);

        // Optional: Update user data (e.g., last login time) and write back to file
        // user.lastLogin = new Date().toISOString();
        // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        // Send response
        const { password, ...others } = user;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);

    } catch (err) {
        next(err);
    }
}

;




 export const getAllUser = async (req, res) => {
    const user = readUsersFromFile();
    res.status(200).json(user);
};




