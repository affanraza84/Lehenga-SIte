"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type WishlistItem = {
  id: number;
  title: string;
  image: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  isLoaded: boolean; // Add loading state
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }
  }, [wishlist, isLoaded]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (!prev.find((i) => i.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoaded,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};