/* eslint-disable @next/next/no-img-element */
import React from "react";

const Brands = () => {
  return (
    <section className="w-full md:w-[80%]  mx-auto mt-10 bg-card">
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="items-center w-1/2 p-12 text-center  border md:w-1/4 lg:w-1/6 dark:border-none"
          >
            <img
              src={`./doms.png`}
              alt={`Brand ${index + 1}`}
              className="mx-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
