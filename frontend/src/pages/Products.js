import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import {IMAGE_BASE_URL} from "../config/imageConfig"
 


export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getProducts();
  },[]);

  const getProducts = async () => {
    try{
    const response = await axios.get("http://localhost:8080/products/all",{headers :{Authorization:`Bearer ${token}`}});
    console.log("Products length:", response.data.length); 
    setProducts(response.data);
    console.log("useEffect called");
    }catch(err){
      alert("faided");
    }
  }; 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
            <p className="text-sm text-gray-600">
              Browse our latest arrivals and add your favorites to the cart.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
            <button
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
              onClick={() => navigate("/products/cart")}
            >
              Cart: {totalItems}
            </button>
          </div>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-0.5 hover:shadow-lg"
              key={product.id}
            >
              <img
                className="h-44 w-full object-cover transition duration-200 group-hover:scale-[1.01]"
                src={IMAGE_BASE_URL}
                alt={product.name}
              />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Details
                    </button>
                    <button
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

