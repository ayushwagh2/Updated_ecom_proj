import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import {IMAGE_BASE_URL} from "../config/imageConfig"

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();

  const [product, setProduct] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data);
    } catch (err) {
      alert("Failed to load product");
    }
  };

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <button onClick={() => navigate("/products/cart")}>
            Cart: {totalItems}
          </button>
        </header>

        <div className="flex gap-6 bg-white p-6 rounded-xl shadow">
          <img
            src={IMAGE_BASE_URL}
            alt={product.name}
            className="w-96 object-cover"
          />

          <div className="flex flex-col gap-4">
            <p>{product.description}</p>
            <span className="text-xl font-bold">
              {formatCurrency(product.price)}
            </span>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
