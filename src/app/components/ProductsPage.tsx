"use client";

import { useState, useEffect } from "react";
import { FaStar, FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import products from "../data/productsDetails";
import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useWishlist } from "@/app/context/WishlistContext";

// Product type
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  size: string;
  fabric: string;
  color: string;
  images: string[];
  videoUrl: string;
}

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="text-amber-200/20 fill-current"
          >
            <path d="M10 2c-3 0-5 2-5 5 0 2 1 3 2 4 1 1 2 2 2 3s1 2 3 2 3-1 3-2s-1-2-2-3-2-2-2-4c0-3-2-5-3-5z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

const ProductRow = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToCart } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isLoaded: wishlistLoaded,
  } = useWishlist();

  const inWishlist = wishlistLoaded ? isInWishlist(product.id) : false;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#E9DCCF] hover:border-[#D2691E]/30 overflow-hidden transition-all duration-500 hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Image Gallery Section */}
          <div className="relative bg-gradient-to-br from-[#F5F1EA] to-[#E9DCCF] p-6">
            <div className="grid grid-cols-2 grid-rows-2 gap-3 h-80">
              {product.images.slice(0, 4).map((image: string, idx: number) => (
                <div
                  key={idx}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    currentImageIndex === idx ? "ring-4 ring-[#D2691E]" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <Image
                    src={image}
                    alt={`${product.title} pose ${idx + 1}`}
                    fill
                    className="object-contain transition-transform duration-300"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                  })
                }
                className="w-full py-3 bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#D2691E] hover:to-[#8B4513] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                Add to Cart - ₹{product.price.toLocaleString("en-IN")}
              </button>

              <button
                onClick={() =>
                  inWishlist
                    ? removeFromWishlist(product.id)
                    : addToWishlist({
                        id: product.id,
                        title: product.title,
                        image: product.images[0],
                      })
                }
                className="w-full py-3 bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#D2691E] hover:to-[#8B4513] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                <FaHeart className="text-white" />
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative bg-black/5 p-6 flex items-center justify-center">
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden bg-black shadow-2xl">
              <video
                src={product.videoUrl}
                className="w-full h-full object-cover"
                poster={product.images[0]}
                muted
                autoPlay
                loop
              />
            </div>
          </div>

          {/* Description Section */}
          <div className="p-8 flex flex-col justify-between bg-gradient-to-br from-white to-[#F5F1EA]/30">
            <div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-4 leading-tight">
                {product.title}
              </h3>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-[#D2691E]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-[#D2691E] text-sm" />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-[#E9DCCF] rounded-lg p-2 text-center">
                  <div className="text-xs text-[#8B4513] font-medium">Size</div>
                  <div className="text-sm font-bold text-[#2C1810]">
                    {product.size}
                  </div>
                </div>
                <div className="bg-[#E9DCCF] rounded-lg p-2 text-center">
                  <div className="text-xs text-[#8B4513] font-medium">
                    Fabric
                  </div>
                  <div className="text-sm font-bold text-[#2C1810] capitalize">
                    {product.fabric}
                  </div>
                </div>
                <div className="bg-[#E9DCCF] rounded-lg p-2 text-center">
                  <div className="text-xs text-[#8B4513] font-medium">
                    Color
                  </div>
                  <div className="text-sm font-bold text-[#2C1810] capitalize">
                    {product.color}
                  </div>
                </div>
              </div>

              <p className="text-[#8B4513] leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E9DCCF]">
              <div className="flex items-center justify-between text-xs text-[#8B4513]">
                <span>Handcrafted with Care</span>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  const { wishlistCount, isLoaded: wishlistLoaded } = useWishlist();

  const [filters, setFilters] = useState<{
    size: string;
    price: string;
    fabric: string;
    color: string;
  }>({
    size: "",
    price: "",
    fabric: "",
    color: "",
  });

  const filteredProducts = products.filter((product: Product) => {
    const matchesSize = filters.size ? product.size === filters.size : true;
    const matchesPrice = filters.price
      ? (() => {
          const [min, max] = filters.price.split("-").map(Number);
          return product.price >= min && product.price <= (max || Infinity);
        })()
      : true;
    const matchesFabric = filters.fabric
      ? product.fabric === filters.fabric
      : true;
    const matchesColor = filters.color ? product.color === filters.color : true;

    return matchesSize && matchesPrice && matchesFabric && matchesColor;
  });

  const Dropdown = ({
    label,
    options,
    filterKey,
  }: {
    label: string;
    options: { label: string; value: string }[];
    filterKey: keyof typeof filters;
  }) => (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }: { open: boolean }) => (
        <>
          <Menu.Button className={`inline-flex justify-between items-center w-44 px-4 py-3 bg-gradient-to-r from-white to-[#F5F1EA] text-[#2C1810] font-semibold rounded-xl shadow-lg border-2 border-[#E9DCCF] hover:border-[#D2691E] hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer ${open ? 'ring-2 ring-[#D2691E]/30 shadow-xl scale-105' : ''}`}>
            <span className="truncate">{filters[filterKey] || label}</span>
            <div className={`ml-2 p-1 rounded-full transition-all duration-300 ${open ? 'bg-[#D2691E]/10 rotate-180' : 'bg-transparent'}`}>
              <FaChevronDown className={`text-sm transition-colors duration-300 ${open ? 'text-[#D2691E]' : 'text-[#8B4513]'}`} />
            </div>
          </Menu.Button>

          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                as={motion.div}
                initial={{ opacity: 0, x: 15, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
                exit={{ opacity: 0, x: 15, scale: 0.95, transition: { duration: 0.2 } }}
                className="absolute right-full bottom-0 mr-2 w-52 rounded-xl bg-white/95 backdrop-blur-md shadow-2xl ring-1 ring-[#E9DCCF] border border-[#E9DCCF]/50 focus:outline-none z-[9999] overflow-hidden"
              >
                <div className="py-2">
                  {options.map((opt, index) => (
                    <Menu.Item key={opt.value}>
                      {({ active }: { active: boolean }) => (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05 } }}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              [filterKey]: opt.value,
                            }))
                          }
                          className={`${
                            active
                              ? "bg-gradient-to-r from-[#F5F1EA] to-[#E9DCCF] text-[#D2691E] shadow-md"
                              : "text-[#2C1810] hover:bg-[#F5F1EA]/50"
                          } ${filters[filterKey] === opt.value ? 'bg-[#D2691E]/10 text-[#D2691E] font-semibold border-l-4 border-[#D2691E]' : ''} 
                          block px-4 py-3 text-sm w-full text-left cursor-pointer transition-all duration-300 transform hover:translate-x-1 hover:shadow-sm relative group`}
                        >
                          <span className="flex items-center justify-between">
                            {opt.label}
                            {filters[filterKey] === opt.value && (
                              <span className="w-2 h-2 bg-[#D2691E] rounded-full animate-pulse"></span>
                            )}
                          </span>
                          {active && (
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#D2691E] to-[#8B4513] rounded-r"></div>
                          )}
                        </motion.button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                
                {/* Beautiful bottom accent */}
                <div className="h-1 bg-gradient-to-r from-[#8B4513] via-[#D2691E] to-[#8B4513]"></div>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#F5F1EA] via-[#E9DCCF] to-[#DDD0BF] pt-20">
      <FloatingElements />

      {/* Hero Section */}
      <div className="relative z-10 text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#2C1810] mb-4 tracking-wide">
            Exquisite
            <span className="block text-[#D2691E] italic font-serif">
              Lehengas
            </span>
          </h1>
          <p className="text-xl text-[#8B4513] mb-8 font-light">
            Handcrafted with tradition, designed for elegance
          </p>

          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className="text-[#D2691E] text-2xl animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Products */}
      <div className="relative z-10 px-4 pb-16 max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#E9DCCF] relative z-30">
          <Dropdown
            label="Select Size"
            filterKey="size"
            options={[
              { label: "All Sizes", value: "" },
              { label: "Small", value: "S" },
              { label: "Medium", value: "M" },
              { label: "Large", value: "L" },
              { label: "XL", value: "XL" },
            ]}
          />
          <Dropdown
            label="Select Price"
            filterKey="price"
            options={[
              { label: "All Prices", value: "" },
              { label: "Under ₹5000", value: "0-5000" },
              { label: "₹5000 - ₹10000", value: "5000-10000" },
              { label: "₹10000 - ₹20000", value: "10000-20000" },
              { label: "Above ₹20000", value: "20000-" },
            ]}
          />
          <Dropdown
            label="Select Fabric"
            filterKey="fabric"
            options={[
              { label: "All Fabrics", value: "" },
              { label: "Silk", value: "silk" },
              { label: "Cotton", value: "cotton" },
            ]}
          />
          <Dropdown
            label="Select Color"
            filterKey="color"
            options={[
              { label: "All Colors", value: "" },
              { label: "Red", value: "red" },
              { label: "Yellow", value: "yellow" },
            ]}
          />
        </div>

        {/* Products */}
        <div className="space-y-8 relative z-10">
          {filteredProducts.map((product, index) => (
            <ProductRow key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#E9DCCF]">
            <p className="text-xl text-[#8B4513] font-medium">
              No products found matching your filters.
            </p>
            <button
              onClick={() =>
                setFilters({ size: "", price: "", fabric: "", color: "" })
              }
              className="mt-4 px-6 py-3 bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#D2691E] hover:to-[#8B4513] transition-all duration-300 cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Wishlist Summary */}
        <div className="mt-12 text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#E9DCCF] relative z-10">
          <div className="mb-4">
            {!wishlistLoaded ? (
              <div className="animate-pulse">
                <div className="h-6 bg-gray-300 rounded mx-auto w-48 mb-4"></div>
              </div>
            ) : (
              <p className="text-[#8B4513] text-lg font-medium">
                {wishlistCount === 0
                  ? "Your wishlist is empty"
                  : `You have ${wishlistCount} item${
                      wishlistCount === 1 ? "" : "s"
                    } in your wishlist`}
              </p>
            )}
          </div>

          {wishlistLoaded && wishlistCount > 0 && (
            <Link
              href="/wishlist"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#D2691E] hover:to-[#8B4513] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaHeart className="text-white" />
              View Wishlist ({wishlistCount})
            </Link>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}