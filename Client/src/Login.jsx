import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const APIURL = 'http://localhost:3001';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIURL}/login`, { email, password });
      toast.success(response.data.message);
      navigate('/home');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-light min-vh-100'>
      <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <div className="text-center">
            <p className="mb-0">Don't have an account?</p>
            <Link to="/" className="btn btn-link">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}