import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, totalItems } = useCart();
  const [product, setProduct] = useState([]); 

  useEffect(() => {
    getProduct();
  },[]);

  const getProduct = async () => {
    try{
    const response = await axios.get("http://localhost:8080/products/all",{headers :{Authorization:`Bearer ${token}`}});
    
    setProducts(response.data);
    console.log("useEffect called");
    }catch(err){
      alert("faided");
    }
  }; 

  if (!product) {
    return (
      <div className="page">
        <p>Product not found.</p>
        <button className="link-btn" onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
              onClick={() => navigate("/products/cart")}
            >
              Cart: {totalItems}
            </button>
            <button
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              onClick={() => navigate("/products")}
            >
              Back to Products
            </button>
          </div>
        </header>

        <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 md:flex-row">
          <img
            className="h-64 w-full object-cover md:h-auto md:w-96"
            src={product.image}
            alt={product.name}
          />
          <div className="flex flex-1 flex-col gap-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="mt-auto flex items-center justify-between gap-3">
              <span className="text-xl font-semibold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              <div className="flex gap-2">
                <button
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-gray-50"
                  onClick={() => navigate("/products")}
                >
                  Keep Shopping
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
      </div>
    </div>
  );
}

