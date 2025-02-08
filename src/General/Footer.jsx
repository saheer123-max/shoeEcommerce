// import React from "react";

// const Footer = () => {
//   return (
//     <footer style={{ background: "#222", color: "#fff", padding: "20px", textAlign: "center" }}>
//       <p>&copy; {new Date().getFullYear()} Shoe Store. All Rights Reserved.</p>
//       <p>Follow us on: 
//         <a href="#" style={{ color: "#f4a261", margin: "0 10px" }}>Facebook</a> | 
//         <a href="#" style={{ color: "#f4a261", margin: "0 10px" }}>Instagram</a>
//       </p>
//     </footer>
//   );
// };

// export default Footer;




import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-5 text-center">
      <p>&copy; {new Date().getFullYear()} Shoe Store. All Rights Reserved.</p>
      <p>Follow us on: 
        <a href="#" className="text-orange-400 mx-2">Facebook</a> | 
        <a href="#" className="text-orange-400 mx-2">Instagram</a>
      </p>
    </footer>
  );
};

export default Footer;
