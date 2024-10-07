import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [message, setMessage] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://mongodb+srv://emansibghatuaf:emandb@cluster0.murtd.mongodb.net/employee', { name, email, password });

      if (response.data.message === "Success") {
        setMessage('Registration successful!');  
      } else {
        setMessage('Registration failed: ' + response.data.message); 
      }
    } catch (error) {
    
      console.log(error); 
      if (error.response) {
        console.log(error.response); 
        switch (error.response.status) {
          case 400:
            setMessage('Error: Missing required fields');
            break;
          case 401:
            setMessage('Error: Invalid password');
            break;
          case 409:
            setMessage('Error: User already exists');
            break;
          default:
            setMessage('Error: Registration failed');
        }
      } else {
        setMessage('Error: ' + error.message);  
      }
    }
  };

  return (
    <div className="container-fluid bg-light">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input 
                    type="text" 
                    className="form-control"
                    id="name"
                    placeholder="Enter Name" 
                    autoComplete="off" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input 
                    type="email" 
                    className="form-control"
                    id="email"
                    placeholder="Enter Email" 
                    autoComplete="off" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input 
                    type="password" 
                    className="form-control"
                    id="password"
                    placeholder="Enter Password" 
                    autoComplete="off" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>
              {message && <div className="mt-3 text-center"><p>{message}</p></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
