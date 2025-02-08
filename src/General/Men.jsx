// import React, { useState, useEffect, useContext } from 'react';

// import { productcontext } from '../Context/GlobalProvider';
// import { Context } from '../Header/ProductProvider';
// import { Link } from 'react-router-dom';



// function Men() {
//   const [menProducts, setMenProducts] = useState([]); // Store the fetched products
//   const [displayedProducts, setDisplayedProducts] = useState([]); // Store products to display
//   const [currentPage, setCurrentPage] = useState(1); // Current page state
//   const [totalPages, setTotalPages] = useState(0); // Total pages state
//   const itemsPerPage = 6; // Number of items to display per page
//   const {post,Men, loading,} = useContext(productcontext)
  


//   useEffect(() => {
//     if (Men.length > 0) {
//       // Calculate total pages based on the number of items and itemsPerPage
//       setTotalPages(Math.ceil(Men.length / itemsPerPage));
  
//       // Set displayed products for the initial page (page 1)
//       const startIndex = 0;
//       const endIndex = itemsPerPage;
//       setDisplayedProducts(Men.slice(startIndex, endIndex));
//     }
//   }, [Men]);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) { 
//       setCurrentPage(page);
//       const startIndex = (page - 1) * itemsPerPage;
//       const endIndex = startIndex + itemsPerPage;
//       setDisplayedProducts(Men.slice(startIndex, endIndex)); 
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-xl">Loading...</div>;
//   }

//   const addToCart = () => {
//     if(user === null){
//       alert("please Login")
//       navigate('/login')
//     }else{
//       const isAlreadyInCart = cartItems.some(item => item.id === shoe[0].id);


//       if (!isAlreadyInCart) {
//         const updatedCart = [...cartItems, {...shoe[0],qty:1}];
    
//         api.patch(`users/${userData.id}`, {
//           usercart: updatedCart
//         })
//           .then(response => {
//             console.log(response.data);
//             setCartItems(updatedCart); 
//             alert("One item added to cart");
//             navigate('/');
//           })
//           .catch(err => {
//             console.error(err);
//           });
//       } else {
//         alert("This item is already in the cart");
//       }
//     }}


//   return (
//     <div className="bg-gray-100 py-8 px-4">
//       <h2 className="text-3xl font-bold text-center mb-6">Men's Collection</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {displayedProducts?.map((product) => (
//          <div
//             key={product.id}
//             className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
//           >
//            <Link to={`/men/${product.id}`}>
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-40 h-40 object-cover mb-4"
//             />
//             <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
//             <p className="text-gray-600 mb-4">{product.description}</p>
//             <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
//             </Link>
//             <button onClick={addToCart} className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-6">
//         {/* Previous button */}
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1} // Disable on the first page
//           className="px-4 py-2 bg-yellow-500 text-white rounded-l hover:bg-yellow-400"
//         >
//           Previous
//         </button>

//         {/* Page numbers */}
//         <span className="px-4 py-2">
//           {currentPage} / {totalPages}
//         </span>

//         {/* Next button */}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages} // Disable on the last page
//           className="px-4 py-2 bg-yellow-500 text-white rounded-r hover:bg-yellow-400"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Men;





import React, { useState, useEffect, useContext } from 'react';
import { productcontext } from '../Context/GlobalProvider';
import { Link, useNavigate } from 'react-router-dom';

function Men() {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const { Men, loading,addToCart } = useContext(productcontext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Men) {
      const newTotalPages = Math.ceil(Men.length / itemsPerPage);
      setTotalPages(newTotalPages);
      setCurrentPage((prev) => (prev > newTotalPages ? 1 : prev)); 
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedProducts(Men.slice(startIndex, endIndex));
    }
  }, [Men, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Add product to cart
  // const addToCart = (product) => {
  //   const user = JSON.parse(localStorage.getItem('user')) || null;
  //   if (!user) {
  //     alert("Please Login");
  //     navigate('/login');
  //   } else {
  //     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  //     const isAlreadyInCart = cartItems.some(item => item.id === product.id);

  //     if (!isAlreadyInCart) {
  //       const updatedCart = [...cartItems, { ...product, qty: 1 }];
  //       localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  //       alert("One item added to cart");
  //     } else {
  //       alert("This item is already in the cart");
  //     }
  //   }
  // };


  
  





  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (

    <div className="bg-gray-100 py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Men's Collection</h2>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <Link to={`/men/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-40 h-40 object-cover mb-4" />
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
             
              <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
            > 
              Add to Cart
            </button>
          </div>
        ))}
      </div>

     
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Men;
