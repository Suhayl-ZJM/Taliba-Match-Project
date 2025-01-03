const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../model/User");

const router = express();

router.post("/register", async (req, res) => {
    const { username, email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const defaultPassword = "defaultPassword123";

        // Hash the password
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;