import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setname] = useState("")
  // const [isValid, setIsvalid] = useState(true)
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });
  const navgate = useNavigate();

  const validateForm = () => {
    let userData = { email, password, confirmPassword, isAdmin: false, name };
    


    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!email) {
    //   formErrors.email = "Email is required";
    //   setIsvalid(false)
    // } else if (!emailRegex.test(email)) {
    //   formErrors.email = "Enter a valid email address";
    //   setIsvalid(false)
    // }


    // if (!password) {
    //   formErrors.password = "Password is required";
    //   setIsvalid(false)
    // } else if (password.length < 6) {
    //   formErrors.password = "Password must be at least 6 characters";
    //   setIsvalid(false)
    // }

    // if (password !== confirmPassword) {
    //   formErrors.confirmPassword = "Passwords do not match";
    //   setIsvalid(false)
    // }

    // setErrors(formErrors);



    if (email && password && confirmPassword === password && name) {
      fetch("http://localhost:3000/user", {
        method: "POST", header: { "content-type": "application/json" }, body: JSON.stringify(userData)
      })
      alert("Account created successfully")
      navgate('/login')
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      alert("Signed up successfully!");
      navgate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {"Signup"}
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>



        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full p-2 border rounded ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>


        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Name
          </label>
          <input
            type="name"
            id=""
            value={name}
            onChange={(e) => setname(e.target.value)}
            className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

























        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          {"Signup"}
        </button>


        <p
          onClick={() => navgate('/login')}
          className="text-center mt-4 text-blue-500 cursor-pointer hover:underline"
        >
          {"Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}

export default Form;

