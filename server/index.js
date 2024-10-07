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


aapp.post('/register', (req, res) => {
    const { email } = req.body;
  
    EmployeeModel.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).json({ message: "User already exists" });
        }
  
        return EmployeeModel.create(req.body)
          .then(employee => res.json({ message: "Success" }))
          .catch(error => {
            console.error(error);
            res.status(500).json({ message: "Error creating employee" });
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      });
  });


app.post('/Login', (req, res) => {
  const { email, password } = req.body;  

  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {  
          res.json("Success");
        } else {
          res.status(401).json("Incorrect password");
        }
      } else {
        res.status(404).json("No record found");
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));  
});


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
