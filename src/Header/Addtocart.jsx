


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { productcontext } from '../Context/GlobalProvider';

function Addtocart() {
  const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeItem,clearcart } = useContext(productcontext);

  return (
    <div className="bg-gray-100 py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-40 h-40 object-cover mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-bold text-gray-800">₹{item.price * item.qty}</p>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <p className="text-sm text-gray-500">Quantity: {item.qty}</p>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="text-center mt-6">
          <p className="text-xl font-bold mb-4">Total Price: ₹{totalPrice}</p>
          <button 
          className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
          onClick={()=>clearcart()}>
            CHECK OUT
            </button>
          {/* <Link
            to="/"
            className="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition"
          >
            Continue Shopping
          </Link> */}
        </div>
      )}
    </div>
  );
}

export default Addtocart;