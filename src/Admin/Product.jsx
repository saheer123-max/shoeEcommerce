import React, { useState, useEffect } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ id: "", name: "", type: selectedCategory, image: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter Products Based on Selected Category
  const filteredProducts = products.filter((product) => product.type === selectedCategory);

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ Show Add Form
  const showAddForm = () => {
    setNewProduct({ id: Date.now(), name: "", type: selectedCategory, image: "" });
    setShowForm(true);
    setEditingProduct(null);
  };

  // ✅ Hide Add Form
  const hideForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ✅ Add Product (POST)
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.image) return;

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // ✅ Edit Product (PATCH)
  const editProduct = async (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowForm(true);
  };

  // ✅ Save Edited Product (PATCH)
  const saveProduct = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch(`http://localhost:3000/product/${editingProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      const updatedProduct = await response.json();

      // ✅ Update the product list in state
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // ✅ Delete Product (DELETE)
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:3000/product/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Product Management</h2>

      {/* Category Selection */}
      <div className="flex justify-center mb-4 space-x-4">
        {["men", "women"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Product Button */}
      {!showForm && (
        <button onClick={showAddForm} className="w-full bg-green-500 text-white py-2 rounded mb-4">
          Add Product
        </button>
      )}

      {/* Add/Edit Product Form */}
      {showForm && (
        <div className="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">{editingProduct ? "Edit Product" : "Add Product"}</h3>
          <input
            type="text"
            name="id"
            placeholder="Product ID"
            value={newProduct.id}
            disabled
            className="border p-2 rounded w-full mb-2 bg-gray-200"
          />
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          />
          <select
            name="type"
            value={newProduct.type}
            onChange={handleInputChange}
            className="border p-2 rounded w-full mb-2"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
          <div className="flex justify-between">
            <button
              onClick={editingProduct ? saveProduct : addProduct}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              {editingProduct ? "Save Changes" : "Add Product"}
            </button>
            <button onClick={hideForm} className="bg-gray-400 text-white py-2 px-4 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <section>
        <h3 className="text-lg font-semibold mb-2 capitalize">{selectedCategory} Section</h3>
        <ul className="space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id} className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm text-gray-500">Type: {product.type}</p>
                  <p className="text-sm text-gray-500">ID: {product.id}</p>
                </div>
                <button onClick={() => editProduct(product)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => deleteProduct(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available</p>
          )}
        </ul>
      </section>
    </div>
  );
}

export default Product;
