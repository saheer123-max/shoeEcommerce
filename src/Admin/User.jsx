// import React, { useState, useEffect } from 'react';

// function User() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/user');
//         const data = await response.json();

//         console.log("Fetched Users:", data);

//         setUsers(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleUserClick = (user) => {
//     // If the clicked user is already selected, hide the details (toggle effect)
//     if (selectedUser && selectedUser.id === user.id) {
//       setSelectedUser(null);
//     } else {
//       setSelectedUser(user);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>

//       {loading ? (
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all cursor-pointer 
//                 ${selectedUser && selectedUser.id === user.id ? "bg-blue-100" : ""}`}
//               onClick={() => handleUserClick(user)}
//             >
//               <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Selected User Details */}
//       {selectedUser && (
//         <div className="mt-6 p-4 border rounded-lg bg-gray-100">
//           <h3 className="text-lg font-bold text-gray-800">User Details</h3>
//           <p><strong>Email:</strong> {selectedUser.email}</p>
//           <p><strong>Password:</strong> {selectedUser.password}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default User;



import React, { useState, useEffect } from 'react';

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Fetch Orders for Selected User
  useEffect(() => {
    if (selectedUser) {
      fetchOrders(selectedUser.id);
    } else {
      setOrders([]);
    }
  }, [selectedUser]);

  const fetchOrders = async (userId) => {
    setOrderLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/order?userId=${userId}`);
      const data = await response.json();
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser((prev) => (prev && prev.id === user.id ? null : user));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User List</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all cursor-pointer ${selectedUser && selectedUser.id === user.id ? "bg-blue-100" : ""}`}
              onClick={() => handleUserClick(user)}
            >
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedUser && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <h3 className="text-lg font-bold text-gray-800">{selectedUser.name}'s Orders</h3>
          <h3 className="text-lg font-bold text-gray-800">{selectedUser.email}</h3>


          {orderLoading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : orders.length > 0 ? (
            <ul className="mt-2">
              {orders.map((order) => (
                <li key={order.id} className="mb-2 border-b pb-2">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
