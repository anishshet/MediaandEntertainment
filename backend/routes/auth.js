import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Import your User model

const router = express.Router();
router.use(express.json())

// Helper function to handle server errors
const handleServerError = (res, error) => {
  console.error(error);
  return res.status(500).json({ message: 'Server error' });
};

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received data:", { username, email, password }); // Log received data

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    console.log("User saved:", savedUser); // Log saved user

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    handleServerError(res, error);
  }
});


// Login route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, 'SECRET_KEY', { expiresIn: '1h' });

    // Respond with the token and success message
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    handleServerError(res, error);
  }
});

export default router;