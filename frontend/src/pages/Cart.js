import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import {IMAGE_BASE_URL} from "../config/imageConfig"

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
            <p className="text-sm text-gray-600">
              {totalItems === 0
                ? "No items yet. Add some products to get started."
                : `You have ${totalItems} item${totalItems > 1 ? "s" : ""} in your cart.`}
            </p>
          </div>
          <button
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </header>

        {items.length === 0 ? (
          <div className="rounded-xl bg-white p-6 text-sm text-gray-700 shadow-sm ring-1 ring-gray-200">
            <div className="flex flex-col gap-3">
              <p>Your cart is empty.</p>
              <button
                className="w-fit rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onClick={() => navigate("/products")}
              >
                Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 md:flex-row"
                key={item.id}
              >
                <img
                  className="h-52 w-full object-cover md:h-auto md:w-64"
                  src={IMAGE_BASE_URL}
                  alt={item.name}
                />
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <span className="text-lg font-semibold text-gray-900">
                      {item.quantity} x {formatCurrency(item.price)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
                        onClick={() => navigate(`/products/${item.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-5 py-4 shadow-sm ring-1 ring-gray-200">
            <span className="text-lg font-semibold text-gray-900">
              Total: {formatCurrency(totalPrice)}
            </span>
            <button className="cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm">
              Checkout (Coming soon)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

