import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productcontext } from '../Context/GlobalProvider';
import Profile from './Profile';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const { users, setactiv, activ, } = useContext(productcontext)






  const handleSubmit = (e) => {
    e.preventDefault();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      console.log(users)

      if (user) {
        if (user.isAdmin === false) {
          alert('Logged in successfully!');
          setactiv(user)
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/');
        }else{
          alert('Logged in successfully!');
        setactiv(user)
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/admin');
        }
      } else {
        alert('Invalid email or password');
      }
    
  };


  const handleLogout = () => {
    setactiv()
    localStorage.removeItem('user');
    navigate('/login');
  };
  console.log("active", activ);

  return (
    <>
      {activ ? (
        <Profile />
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
              {'Login'}
            </h2>


            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>


            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              {'Login'}
            </button>

            <div className="text-center mt-4">
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>


            {
              <div className="text-center mt-4">
                <Link to={'/form'}><p className="text-gray-600">
                  Don't have an account?{' '}

                  Sign up
                </p></Link>
              </div>
            }
          </form>
        </div>
      )}
    </>
  );
}

export default Login;








