"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const productCategories = [
  { name: "Beige Lehenga", image: "/images/upperLeh1.avif" },
  { name: "Blue Lehenga", image: "/images/upperLeh2.avif" },
  { name: "Green Lehenga", image: "/images/upperLeh3.avif" },
  { name: "Maroon Bridal Lehenga", image: "/images/upperLeh4.avif" },
  { name: "Pink Lehenga", image: "/images/upperLeh5.avif" },
  { name: "Red Lehenga", image: "/images/upperLeh6.avif" },
];

// Generate random floating element styles
const generateFloatingStyles = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
    animationDuration: `${(5 + Math.random() * 5).toFixed(2)}s`,
  }));
};

// Floating decorative elements
const FloatingElements = () => {
  const [styles, setStyles] = useState<{ [key: string]: string }[]>([]);

  useEffect(() => {
    // Only generate random positions on client
    setStyles(generateFloatingStyles(12));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {styles.map((style, i) => (
        <div key={i} className="absolute animate-float" style={style}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="text-[#D2691E]/20 fill-current"
          >
            <path d="M8 2c-2 0-3 1-3 3 0 1 1 2 1 3s1 2 2 2 2-1 2-2-1-2-1-3c0-2-1-3-2-3z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative pt-40 md:pt-48 pb-20 bg-gradient-to-br from-[#F5F1EA] via-[#E9DCCF] to-[#DDD0BF] overflow-hidden">
      <FloatingElements />

      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-[#2C1810] mb-3">
            Discover Our
            <span className="block text-[#D2691E] font-serif italic">
              Lehenga Collection
            </span>
          </h1>
          <p className="text-lg text-[#8B4513] max-w-2xl mx-auto leading-relaxed">
            Explore our exquisite range of handcrafted lehengas, each piece
            telling a story of tradition and elegance.
          </p>
        </div>

        {/* Categories */}
        <section>
          {/* Mobile Scroll */}
          <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide md:hidden px-2">
            {productCategories.map((category, index) => (
              <div
                key={category.name}
                className={`flex flex-col items-center flex-shrink-0 w-32 transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-full border-2 border-[#E9DCCF] group-hover:border-[#D2691E] transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover w-24 h-24 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <p className="mt-3 text-sm font-semibold text-[#2C1810] group-hover:text-[#D2691E] transition-colors">
                  {category.name}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
            {productCategories.map((category, index) => (
              <div
                key={category.name}
                className={`flex flex-col items-center group transform transition-all duration-700 ${
                  isLoaded
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-12 opacity-0 scale-90"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-full border-2 border-[#E9DCCF] group-hover:border-[#D2691E] transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={144}
                    height={144}
                    className="rounded-full object-cover w-36 h-36 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-[#2C1810] group-hover:text-[#D2691E] transition-colors duration-300 text-center">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
      `}</style>
    </main>
  );
};

export default HeroSection;
