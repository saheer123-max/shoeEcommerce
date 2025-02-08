// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { productcontext } from '../Context/GlobalProvider';

// function Profile() {
//   const navigate = useNavigate()
//   const {setactiv}=useContext( productcontext);

  
//   const logout = () => {
//   setactiv()
//     localStorage.clear()
//     alert("logout succesfully");

//     navigate('/')
    
//   }
//   return (
//     <div className='w-[100%] h-[100vh] flex justify-center items-center'>
//       <div className='w-[200px] h-[50px] bg-red-500 flex items-center justify-center cursor-pointer' onClick={logout}><p className='text-xl text-white'>logout</p></div>
//     </div>
//   )
// }

// export default Profile




import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { productcontext } from '../Context/GlobalProvider';

function Profile() {
  const navigate = useNavigate();
  const { activ, setactiv } = useContext(productcontext);

  const logout = () => {
    setactiv(null);
    localStorage.clear();
    alert("Logout successfully");
    navigate('/');
  };

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='mb-4 text-xl font-semibold text-gray-800'>
        {activ ? `Logged in as: ${activ.email}` : "Not logged in"}
      </div>
      <div 
        className='w-52 h-12 bg-red-500 flex items-center justify-center cursor-pointer rounded-md hover:bg-red-600 transition duration-300'
        onClick={logout}
      >
        <p className='text-lg text-white'>Logout</p>
      </div>
    </div>
  );
}

export default Profile;
