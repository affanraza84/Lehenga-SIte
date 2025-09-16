"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube
} from "react-icons/fa";

const lehengaCategories = [
  "Bridal Lehengas",
  "Designer Lehengas",
  "Silk Lehengas",
  "Velvet Lehengas",
  "Lehenga Accessories",
];

const supportLinks = ["Track Order", "Contact Us", "My Account"];

export default function Footer() {
  return (
    <footer className="bg-[#421C05] text-white relative overflow-hidden">
      {/* Background SVG */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <Image
          src="/images/footer-ornate-bg.svg"
          alt="Elegant Footer Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Newsletter Section */}
      <div className="max-w-5xl mx-auto px-6 py-8 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h2 className="text-lg font-semibold">Subscribe to Our Lehenga Lookbook</h2>
          <form className="flex w-full md:w-auto">
            <input
              type="email"
              placeholder="Email Address"
              className="px-4 py-2 w-full md:w-72 rounded-l-md text-white bg-[#2C1810] placeholder:text-gray-300 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#E5973D] px-6 py-2 rounded-r-md hover:bg-[#c0761d] transition"
            >
              →
            </button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 z-10 relative text-sm">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">LEHENGA CATEGORIES</h3>
          <ul className="space-y-2">
            {lehengaCategories.map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#E5973D] transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            {supportLinks.map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[#E5973D] transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">CONTACT</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:care@vedantfashions.com" className="hover:text-[#E5973D] transition">
                fittaraofficial@gmail.com
              </a>
            </li>
            {/* <li>1800-120-000-500 (India)</li> */}
            <li>+91 70467 89748</li>
            <li>10 am - 7 pm, Monday - Saturday</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#2C1810] py-6 border-t border-[#543322] text-sm relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white">KEEP IN TOUCH</span>
            <div className="flex space-x-4 text-[#E5973D] text-lg">
              <Link href="https://www.facebook.com/share/1BZn1bHdS9/"><FaFacebookF /></Link>
              <Link href="https://www.instagram.com/fittara.shop?utm_source=qr&igsh=MWtuMjFiaXhuZGJiNg%3D%3D"><FaInstagram /></Link>
              <Link href="https://youtube.com/@fittaraofficial?si=vVwYX7w_gjhXUyje"><FaYoutube/></Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-4 text-xs">
          © 2025 Fittara Fashions Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
