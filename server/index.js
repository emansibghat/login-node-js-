const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employeemodel'); 
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://emansibghatuaf:emandb@cluster0.murtd.mongodb.net/employee", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

app.post('/register', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await EmployeeModel.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    
    await EmployeeModel.create(req.body);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    
    res.json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});