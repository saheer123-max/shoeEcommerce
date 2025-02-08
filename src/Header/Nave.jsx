

import React, { useContext, useEffect, useState } from 'react';
import { FaShippingFast } from 'react-icons/fa';
import { SiPuma } from 'react-icons/si';
import { IoSearch } from 'react-icons/io5';
import { BiSolidCartAdd, BiUserCircle } from "react-icons/bi";
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { productcontext } from '../Context/GlobalProvider';

function Nave() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [user,setUser] =useState()
  const navigate = useNavigate();
    const {users,activ,setactiv} = useContext(productcontext)
  useEffect(() => {
    setUser(users)
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(storedUser);
    
  }, []);
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;
    setactiv(storedUser)
  },[])
  

  // Function to update cart item count
  // const updateCartItemCount = () => {
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  //   const totalItems = cartItems.length;
  //   setCartItemCount(totalItems);
  // };

 const {cartItems} = useContext(productcontext)
  

  const handleLoginClick = () => {
    navigate('/login');
  };

  
  
  

  return (
    <>
      {showNavbar && (
        <header className="Header w-full">
        
          <div className="top-header flex bg-gray-100 px-4 py-2">
            <marquee>
              <div className="flex items-center text-gray-500 text-xl space-x-12">
                <div className="flex items-center">
                  <FaShippingFast />
                  <p className="ml-2">Free shipping for orders over ₹2000 🛍</p>
                </div>
                <p>7 days free exchange 🔄</p>
                <p>Trusted by 2M+ happy customers 😊</p>
              </div>
            </marquee>
          </div>

         
          <div className="mid-header flex justify-between items-center px-8 py-5 bg-[#232323] bg-opacity-90">
            <div className="logo text-white text-2xl">
              <SiPuma />
            </div>

            <div className="input-box flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="p-3 outline-none bg-transparent w-full border border-gray-400 text-white rounded-md h-12"
              />
              <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition duration-300 h-12">
                <IoSearch />
              </button>
            </div>

        
            <div className=" flex items-center space-x-6">
            
              <button
                onClick={() => navigate('/addtocart')}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-600 transition duration-200"
              >
                <BiSolidCartAdd className="text-2xl mr-2" />
                Cart
                {cartItems.length > 0 && (    <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                  {cartItems.length}
              
                  </span>
                )}
              </button>

              <button
                onClick={handleLoginClick}
                className="flex items-center text-white bg-transparent hover:text-yellow-400 transition duration-200"
              >
                {user || activ ? <BiUserCircle className="mr-2 text-xl" /> : <FiLogIn className="mr-2" />}
                {user || activ ? "Profile" : "Login"}
              </button>
            </div>
          </div>

          <nav className="bg-[#232323] py-4">
            <ul className="flex justify-center items-center gap-6 text-lg font-medium">
              <li className="px-4 py-2">
                <Link to="/" className="text-white hover:text-[#fed700] transition duration-300">
                  Home
                </Link>
              </li>
            
              
                <li>
                <Link to="/women" className="text-white hover:text-[#fed700] transition duration-300">
                  Women
                </Link>
                </li>
                <li>
                <Link to="/men" className="text-white hover:text-[#fed700] transition duration-300">
                  Men
                </Link>
                </li>
                <li>
                <Link to="/brand" className="text-white hover:text-[#fed700] transition duration-300">
                  Trend
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
}

export default Nave;











// import React, { useContext, useEffect, useState } from 'react';
// import { FaShippingFast } from 'react-icons/fa';
// import { SiPuma } from 'react-icons/si';
// import { IoSearch } from 'react-icons/io5';
// import { BiSolidCartAdd, BiUserCircle } from "react-icons/bi";
// import { FiLogIn } from 'react-icons/fi';
// import { Link, useNavigate } from 'react-router-dom';
// import { productcontext } from '../Context/GlobalProvider';

// function Nave() {
//   const [user, setUser] = useState();
//   const navigate = useNavigate();
//   const { users, activ, setactiv, cartItems } = useContext(productcontext);

//   useEffect(() => {
//     setUser(users);
//     const storedUser = JSON.parse(localStorage.getItem('user')) || null;
//     setUser(storedUser);
//   }, []);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('user')) || null;
//     setactiv(storedUser);
//   }, []);

//   const handleLoginClick = () => {
//     navigate('/login');
//   };

//   return (
//     <>
//       <header className="fixed top-0 left-0 w-full z-50 bg-[#232323] shadow-md">
       
//         <div className="top-header flex bg-gray-100 px-4 py-2">
//           <marquee>
//             <div className="flex items-center text-gray-500 text-xl space-x-12">
//               <div className="flex items-center">
//                 <FaShippingFast />
//                 <p className="ml-2">Free shipping for orders over ₹2000 🛍</p>
//               </div>
//               <p>7 days free exchange 🔄</p>
//               <p>Trusted by 2M+ happy customers 😊</p>
//             </div>
//           </marquee>
//         </div>

      
//         <div className="mid-header flex justify-between items-center px-8 py-5 bg-[#232323] bg-opacity-90">
//           <div className="logo text-white text-2xl">
//             <SiPuma />
//           </div>

//           <div className="input-box flex items-center">
//             <input
//               type="text"
//               placeholder="Search"
//               className="p-3 outline-none bg-transparent w-full border border-gray-400 text-white rounded-md h-12"
//             />
//             <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-400 transition duration-300 h-12">
//               <IoSearch />
//             </button>
//           </div>

//           <div className="flex items-center space-x-6">
//             <button
//               onClick={() => navigate('/addtocart')}
//               className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full border-2 border-blue-700 hover:bg-blue-600 transition duration-200"
//             >
//               <BiSolidCartAdd className="text-2xl mr-2" />
//               Cart
//               {cartItems.length > 0 && (
//                 <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm">
//                   {cartItems.length}
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={handleLoginClick}
//               className="flex items-center text-white bg-transparent hover:text-yellow-400 transition duration-200"
//             >
//               {user || activ ? <BiUserCircle className="mr-2 text-xl" /> : <FiLogIn className="mr-2" />}
//               {user || activ ? "Profile" : "Login"}
//             </button>
//           </div>
//         </div>
 
      
//         <nav className="bg-[#232323] py-4">
//           <ul className="flex justify-center items-center gap-6 text-lg font-medium">
//             <li className="px-4 py-2">
//               <Link to="/" className="text-white hover:text-[#fed700] transition duration-300">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/women" className="text-white hover:text-[#fed700] transition duration-300">
//                 Women
//               </Link>
//             </li>
//             <li>
//               <Link to="/men" className="text-white hover:text-[#fed700] transition duration-300">
//                 Men
//               </Link>
//             </li>
//             <li>
//               <Link to="/brand" className="text-white hover:text-[#fed700] transition duration-300">
//                 Trend
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </header>


//       <div className="mt-36"></div>
//     </>
//   );
// }

// export default Nave;
