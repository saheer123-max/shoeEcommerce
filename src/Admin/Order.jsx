import React, { useState, useEffect } from "react";

function Order() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product?type=products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Order Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-500 text-sm">Type: {product.type}</p>
              <p className="text-gray-700 font-medium">ID: {product.id}</p>
              {/* <button className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                cancel Now
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
