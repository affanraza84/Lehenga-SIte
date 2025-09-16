"use client";

import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import products from "@/app/data/products";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Floating decorative elements
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-amber-200/20 fill-current">
            <path d="M10 2c-3 0-5 2-5 5 0 2 1 3 2 4 1 1 2 2 2 3s1 2 3 2 3-1 3-2-1-2-2-3-2-2-2-4c0-3-2-5-3-5z" />
          </svg>
        </div>
      ))}

      {[...Array(8)].map((_, i) => (
        <div
          key={`mandala-${i}`}
          className="absolute animate-bounce opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-orange-300/30 fill-current">
            <circle cx="15" cy="15" r="2" />
            <circle cx="15" cy="8" r="1" />
            <circle cx="15" cy="22" r="1" />
            <circle cx="8" cy="15" r="1" />
            <circle cx="22" cy="15" r="1" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [highlightedProduct, setHighlightedProduct] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Scroll to hash if exists
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      const element = document.querySelector(hash);
      if (element) {
        const productId = parseInt(hash.replace("#product-", ""), 10);
        setHighlightedProduct(productId);

        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });

          // Remove highlight after 5 seconds
          setTimeout(() => setHighlightedProduct(null), 5000);
        }, 100);
      }
    }
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#F5F1EA] via-[#E9DCCF] to-[#DDD0BF] pt-24">
        <Navbar/>
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative z-10 text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2C1810] mb-4 tracking-wide">
            Explore Our
            <span className="block text-[#D2691E] italic font-serif">Traditional Collection</span>
          </h1>
          <p className="text-xl text-[#8B4513] mb-8 font-light">
            Handcrafted elegance, perfect for weddings, festivals, and celebrations
          </p>
          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#D2691E] text-2xl animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => {
            const isHighlighted = highlightedProduct === product.id;
            return (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                } ${isHighlighted ? "ring-4 ring-[#D2691E] ring-offset-2 animate-pulse" : ""}`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  animation: isLoaded ? `slideUp 0.8s ease-out ${index*0.05}s both` : "none",
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Card */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-[#E9DCCF] hover:border-[#D2691E]/30">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 space-y-4 bg-gradient-to-b from-white to-[#F5F1EA]/50">
                    <h3 className="font-semibold text-[#2C1810] line-clamp-2 group-hover:text-[#D2691E] transition-colors duration-300 leading-snug">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-[#D2691E]">₹{product.price.toLocaleString("en-IN")}</p>
                      <div className="flex">{[...Array(5)].map((_, i) => <FaStar key={i} className="text-[#D2691E] text-sm" />)}</div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#D2691E] hover:to-[#8B4513] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-[#8B4513]/20 cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* Sparkle hover effect */}
                  {hoveredProduct === product.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-12 right-12 animate-ping">
                        <div className="w-2 h-2 bg-[#D2691E] rounded-full"></div>
                      </div>
                      <div className="absolute bottom-12 left-12 animate-ping" style={{ animationDelay: "0.5s" }}>
                        <div className="w-1 h-1 bg-[#8B4513] rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}
