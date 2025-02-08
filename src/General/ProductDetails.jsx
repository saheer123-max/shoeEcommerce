import React, { useContext, useEffect, useState } from 'react';
import { productcontext } from '../Context/GlobalProvider'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { fetchProductById,product,productByIdLoad } = useContext(productcontext); 
  const { id } = useParams();
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
 
    fetchProductById(id);
  }, [id]);
  

  // const handleAddToCart = (product) => {
  //   if (!user) {
  //     // If user is not logged in, redirect to login page
  //     navigate('/Login');
  //   } else {
  //     // Logic to add product to cart
  //     console.log(`Product with ID ${product.id} added to cart`);
  //     // Add item to cart function should be here, possibly in the user context or a cart context
  //   }
  // };

  if (productByIdLoad) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-gray-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
         <p className="text-gray-600 mb-4">{product.description}</p> 

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-lg text-red-500 line-through mb-2">
           
            </p>
            <p className="text-xl font-bold text-gray-900 mb-4">
            
            </p>
            <p className="text-gray-700 mb-4">{product.detailOne}</p>
            <div className="flex items-center space-x-4">
            

              <Link
                to="/"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetails;


