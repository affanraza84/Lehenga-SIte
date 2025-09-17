"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FiHeart, FiShoppingBag, FiUser } from "react-icons/fi"; // ✅ Outline icons
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext"; // ✅ Added Wishlist Context
import products, { Product } from "@/app/data/products";

const mainLinks = [
  { name: "WOMEN", href: "#" },
  { name: "KIDS", href: "#" },
  { name: "BLOGS", href: "#" },
];

const extraLinks = [
  { name: "WEDDING CLOSET", href: "#" },
  { name: "APPOINTMENTS", href: "#" },
  { name: "PRODUCTS", href: "/products" },
];

const announcements = [
  "Shop your way - Get the best one!",
  "Free shipping on every order — delivered across India!",
  "Enjoy hassle-free returns and exchanges",
];

const Navbar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist(); // ✅ Wishlist count
  const searchRef = useRef<HTMLDivElement>(null);

  const searchTexts = useMemo(
    () => ["Sherwani", "Bridal Lehenga", "Kurta", "Saree", "Short Kurta", "Lehenga"],
    []
  );

  // Announcement rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter placeholder
  useEffect(() => {
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    const typewriter = () => {
      const currentFullText = searchTexts[currentTextIndex];

      if (isDeleting) {
        setSearchText(currentFullText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % searchTexts.length;
        }
      } else {
        setSearchText(currentFullText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        if (currentCharIndex === currentFullText.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      }
    };

    const interval = setInterval(typewriter, isDeleting ? 50 : 100);
    return () => clearInterval(interval);
  }, [searchTexts]);

  // Filter products
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
    } else {
      const results = products.filter((p: Product) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click detection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setFilteredProducts([]);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Announcement Bar */}
      <div
        className={`overflow-hidden bg-[rgb(75,32,8)] text-white text-sm font-medium flex items-center justify-center transition-all duration-300 ${
          scrolled ? "opacity-0 h-0" : "opacity-100 h-8"
        }`}
      >
        <div
          className="flex transition-transform duration-2000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {announcements.map((msg, idx) => (
            <div
              key={idx}
              className="h-8 flex items-center justify-center px-4 min-w-full text-center"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#E9DCCF] shadow-sm border-b border-[#d2c4b5] transition-all duration-300">
        {/* Logo */}
        <div
          className={`flex items-center justify-center transition-all duration-300 ${
            scrolled ? "h-8 lg:h-10" : "h-12 lg:h-14"
          }`}
        >
          <Link href="/">
            <Image
              src="/images/logo2.png"
              alt="Manyavar Mohey Logo"
              width={200}
              height={50}
              className={`transition-all duration-300 ${
                scrolled ? "h-6 w-auto lg:h-8" : "h-10 w-auto lg:h-14 sm:mt-2"
              }`}
              priority
            />
          </Link>
        </div>

        {/* Navbar Links + Search */}
        <div className="container mx-auto px-6 py-2 flex flex-col lg:flex-row lg:justify-between items-start lg:items-center transition-all duration-300">
          {/* Left Links */}
          <nav className="hidden lg:flex justify-start space-x-6 mb-3 lg:mb-0">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-bold text-[#2C1810] hover:text-[#D2691E] transition-colors duration-200 tracking-wide px-2 py-1 group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#D2691E] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 w-full justify-end">
            {/* Extra Links */}
            <nav className="hidden lg:flex space-x-3">
              {extraLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#2C1810] hover:text-[#D2691E] transition-colors duration-200 tracking-tighter px-2 py-1"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="relative w-full md:w-auto" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search for ${searchText}`}
                className="py-1.5 pl-4 pr-10 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D2691E] focus:border-transparent transition-all duration-200 w-full md:w-72 bg-white placeholder-gray-500 rounded-md"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

              {filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 z-50 max-h-64 overflow-y-auto">
                  {filteredProducts.map((p: Product) => (
                    <Link
                      key={p.id}
                      href={`/products#product-${p.id}`}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => {
                        setFilteredProducts([]);
                        setSearchQuery("");
                      }}
                    >
                      <Image
                        src={p.image}
                        alt={p.title}
                        width={40}
                        height={40}
                        className="rounded mr-3"
                      />
                      <span>{p.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4 relative">
              {/* Account */}
              <div className="relative group">
                <Link href="/account" className="text-[#2C1810] hover:text-[#D2691E]">
                  <FiUser className="text-lg" />
                </Link>
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity delay-500 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  My Account
                </span>
              </div>

              {/* Wishlist */}
              <div className="relative group">
                <Link href="/wishlist" className="text-[#2C1810] hover:text-[#D2691E]">
                  <FiHeart className="text-lg" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D2691E] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity delay-500 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  My Wishlist
                </span>
              </div>

              {/* Cart */}
              <div className="relative group">
                <Link href="/store" className="relative text-[#2C1810] hover:text-[#D2691E]">
                  <FiShoppingBag className="text-lg" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D2691E] text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <span className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity delay-500 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  My Cart
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
