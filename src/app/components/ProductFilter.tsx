"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaFilter } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

// Filter types
interface Filters {
  size: string;
  price: string;
  fabric: string;
  color: string;
}

interface ProductFilterProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  resultsCount: number;
}

const ProductFilter = ({ filters, onFiltersChange, resultsCount }: ProductFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // ✅ Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilters]);

  const updateFilter = (filterKey: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({ size: "", price: "", fabric: "", color: "" });
  };

  const Dropdown = ({
    label,
    options,
    filterKey,
    dropUp = false, // 👈 added flag to control drop direction
  }: {
    label: string;
    options: { label: string; value: string }[];
    filterKey: keyof Filters;
    dropUp?: boolean;
  }) => (
    <Menu as="div" className="relative inline-block text-left w-full">
      {({ open }: { open: boolean }) => (
        <>
          {/* Dropdown Button */}
          <Menu.Button
            className={`inline-flex justify-between items-center w-full px-3 py-2 bg-gradient-to-r from-white to-[#F5F1EA] text-[#2C1810] text-sm font-medium rounded-lg shadow-md border border-[#E9DCCF] hover:border-[#D2691E] hover:shadow-lg transition-all duration-300 cursor-pointer ${
              open ? "ring-2 ring-[#D2691E]/30 shadow-lg" : ""
            }`}
          >
            <span className="truncate whitespace-nowrap w-full text-left">
              {filters[filterKey] || label}
            </span>
            <FaChevronDown
              className={`ml-2 text-xs transition-transform duration-300 ${
                open ? "rotate-180 text-[#D2691E]" : "text-[#8B4513]"
              }`}
            />
          </Menu.Button>

          {/* Dropdown Items */}
          <AnimatePresence>
            {open && (
              <Menu.Items
                static
                as={motion.div}
                initial={{ opacity: 0, y: dropUp ? 10 : -10, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  y: dropUp ? 10 : -10,
                  scale: 0.95,
                  transition: { duration: 0.2 },
                }}
                className={`absolute w-56 rounded-xl bg-white shadow-2xl ring-1 ring-[#E9DCCF] border border-[#E9DCCF]/50 focus:outline-none z-[9999] overflow-visible
                  ${dropUp ? "bottom-full mb-1 left-0" : "top-full mt-1 left-0"}`}
              >
                <div className="py-2">
                  {options.map((opt, index) => (
                    <Menu.Item key={opt.value}>
                      {({ active }: { active: boolean }) => (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: index * 0.05 },
                          }}
                          onClick={() => updateFilter(filterKey, opt.value)}
                          className={`${
                            active
                              ? "bg-gradient-to-r from-[#F5F1EA] to-[#F5F1EA] text-[#D2691E]"
                              : "text-[#2C1810] hover:bg-[#F5F1EA]/50"
                          } ${
                            filters[filterKey] === opt.value
                              ? "bg-[#D2691E]/10 text-[#D2691E] font-semibold border-l-4 border-[#D2691E]"
                              : ""
                          } 
                          block px-3 py-2 text-sm w-full text-left cursor-pointer transition-all duration-300 whitespace-nowrap`}
                        >
                          {opt.label}
                        </motion.button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            )}
          </AnimatePresence>
        </>
      )}
    </Menu>
  );

  return (
    <div className="w-64 relative h-fit" ref={filterRef}>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center justify-between w-full px-6 py-3 mb-6 bg-gradient-to-r from-[#8B4513] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#D2691E] hover:to-[#8B4513] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <FaFilter className="text-sm" />
          <span>Filters</span>
        </div>
        <motion.div
          animate={{ rotate: showFilters ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-sm" />
        </motion.div>
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-visible bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-[#E9DCCF] shadow-2xl relative z-40"
          >
            <div className="p-4 space-y-4">
              {/* Filter Header */}
              <div className="flex items-center justify-between border-b border-[#E9DCCF] pb-3">
                <h3 className="text-lg font-semibold text-[#2C1810]">Filter Products</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#D2691E] hover:text-[#8B4513] font-medium transition-colors duration-200 cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">Size</label>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">Price Range</label>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">Fabric</label>
                  <Dropdown
                    label="Select Fabric"
                    filterKey="fabric"
                    options={[
                      { label: "All Fabrics", value: "" },
                      { label: "Silk", value: "silk" },
                      { label: "Cotton", value: "cotton" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#8B4513] mb-2">Color</label>
                  {/* 👇 Force dropUp for small screens */}
                  <Dropdown
                    label="Select Color"
                    filterKey="color"
                    dropUp={true}
                    options={[
                      { label: "All Colors", value: "" },
                      { label: "Red", value: "red" },
                      { label: "Yellow", value: "yellow" },
                    ]}
                  />
                </div>
              </div>

              {/* Active Filters Summary */}
              {(filters.size || filters.price || filters.fabric || filters.color) && (
                <div className="pt-3 border-t border-[#E9DCCF]">
                  <p className="text-xs text-[#8B4513] mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-1">
                    {filters.size && (
                      <span className="px-2 py-1 bg-[#D2691E]/10 text-[#D2691E] text-xs rounded-md border border-[#D2691E]/20">
                        Size: {filters.size}
                      </span>
                    )}
                    {filters.price && (
                      <span className="px-2 py-1 bg-[#D2691E]/10 text-[#D2691E] text-xs rounded-md border border-[#D2691E]/20">
                        Price:{" "}
                        {filters.price.includes("-")
                          ? `₹${filters.price.replace("-", " - ₹")}`
                          : `Above ₹${filters.price}`}
                      </span>
                    )}
                    {filters.fabric && (
                      <span className="px-2 py-1 bg-[#D2691E]/10 text-[#D2691E] text-xs rounded-md border border-[#D2691E]/20">
                        Fabric: {filters.fabric}
                      </span>
                    )}
                    {filters.color && (
                      <span className="px-2 py-1 bg-[#D2691E]/10 text-[#D2691E] text-xs rounded-md border border-[#D2691E]/20">
                        Color: {filters.color}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Results Count */}
              <div className="pt-3 border-t border-[#E9DCCF]">
                <p className="text-sm font-medium text-[#2C1810]">
                  {resultsCount} product{resultsCount !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;