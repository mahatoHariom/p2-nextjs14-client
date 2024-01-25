import React from "react";
import ProductCard from "@/components/Product/ProductCard";
import { FaArrowCircleRight } from "react-icons/fa";

const generateFakeProductArray = () => {
  // Replace this with your actual product generation logic
  return Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
  }));
};

export default function NewArrivals() {
  const fakeProductArray = generateFakeProductArray();

  return (
    <section className="w-full md:w-[80%] m-auto mt-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">New Arrivals</h1>
        <div className="flex items-center gap-3">
          View More <FaArrowCircleRight />
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 mx-auto mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Map over the generated array */}
        {fakeProductArray.map((product, i) => (
          <ProductCard key={i} />
        ))}
      </div>
    </section>
  );
}
