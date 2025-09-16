"use client";

import Navbar from "@/app/components/Navbar";
import { useCart, CartItem } from "@/app/context/CartContext";
import Image from "next/image";

export default function StorePage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-[#F5F1EA] via-[#E9DCCF] to-[#DDD0BF]">
      <Navbar />

      <div className="pt-40 md:pt-48 px-6 lg:px-20">
        <h1 className="text-3xl font-bold mb-8">Your Store</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your store is empty. Add products to see them here.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  id={`product-${item.id}`} // 🔹 important for search link
                  className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
                >
                  <div className="relative w-full h-64 mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-700 mb-2">₹{item.price}</p>
                  <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-auto bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700 transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <ul className="space-y-4">
                {cart.map((item: CartItem) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>
                  ₹
                  {cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>

              <button
                onClick={clearCart}
                className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
