import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductsPage from './components/ProductsPage';

const page = () => {
  return (
    <main className="min-h-screen bg-white antialiased bg-grid-white/[0.02]">
      <Navbar/>
      <HeroSection/>
      <ProductsPage/>
    </main>
  )
}

export default page