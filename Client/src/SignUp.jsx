import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://mongodb+srv://emansibghatuaf:emandb@cluster0.murtd.mongodb.net/employee',{name, email, password }).then(result=>console.log(result))
    navigate('./login')
    .catch(error=>console.log(error));
    
    // Here you would typically send the data to your backend
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-light min-vh-100'>
      <div className="card shadow-lg" style={{maxWidth: '400px', width: '100%'}}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor='name' className="form-label">
                <strong>Name</strong>
              </label>
              <input 
                type='text' 
                id='name'
                placeholder='Enter Name' 
                autoComplete='off' 
                className='form-control'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor='email' className="form-label">
                <strong>Email</strong>
              </label>
              <input 
                type='email' 
                id='email'
                placeholder='Enter Email' 
                autoComplete='off' 
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor='password' className="form-label">
                <strong>Password</strong>
              </label>
              <input 
                type='password' 
                id='password'
                placeholder='Enter Password' 
                autoComplete='off' 
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary w-100 mb-3'>
              Register
            </button>
          </form>
          <div className="text-center">
            <p className="mb-0">Already have an account?</p>
            <Link to="/login" className="btn btn-link">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}