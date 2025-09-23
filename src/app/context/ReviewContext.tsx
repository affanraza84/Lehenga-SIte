"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Review {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Review) => void;
  updateReview: (id: number, rating: number) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const addReview = (review: Review) => {
    setReviews((prev) => {
      const exists = prev.find((r) => r.id === review.id);
      if (exists) {
        return prev.map((r) =>
          r.id === review.id ? { ...r, rating: review.rating } : r
        );
      }
      return [...prev, review];
    });
  };

  const updateReview = (id: number, rating: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating } : r))
    );
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("useReview must be used within ReviewProvider");
  return context;
};
