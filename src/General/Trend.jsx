
import React, { useState, useEffect, useContext } from 'react';

import { productcontext } from '../Context/GlobalProvider';
import { Link } from 'react-router-dom';


function Trend() {
  const [menProducts, setMenProducts] = useState([]); 
  const [displayedProducts, setDisplayedProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const {post,brand, loading,addToCart } = useContext(productcontext)


  useEffect(() => {
    if (brand.length > 0) {
      
      setTotalPages(Math.ceil(brand.length / itemsPerPage));

      const startIndex = 0;
      const endIndex = itemsPerPage;
      setDisplayedProducts(brand.slice(startIndex, endIndex));
    }
  }, [brand]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) { 
      setCurrentPage(page);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedProducts(brand.slice(startIndex, endIndex)); 
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Trend Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts?.map((product) => (
         
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
          >
           <Link to={`/brand/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover mb-4"
            />
            </Link>
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-gray-800">₹{product.price}</p>
            <button  onClick={()=>addToCart(product)} className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition">
              Add to Cart
            </button>
        
          </div>
           
        ))}
      </div>

      
      <div className="flex justify-center mt-6">
      
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-yellow-500 text-white rounded-l hover:bg-yellow-400"
        >
          Previous
        </button>

   
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages} 
          className="px-4 py-2 bg-yellow-500 text-white rounded-r hover:bg-yellow-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Trend;





