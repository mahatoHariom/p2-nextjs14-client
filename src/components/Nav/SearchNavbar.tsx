"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  AiFillHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { ModeToggle } from "../Theme-Toggle";
import Link from "next/link";
// import { useCartStore } from "@/stores/cartStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { Button } from "../ui/button";

const SearchNavbar = () => {
  // const { cart } = useCartStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("query");
    }
    setTimeout(() => {
      router.push(`/products?${params.toString()}`);
    }, 1000);

    // replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full h-full p-3 bg-background">
      <div className="container h-full m-auto w-full grid grid-cols-3 gap-5 items-center md:w-[80%]">
        {/* Logo Column */}
        <div className="col-span-1">
          <Image src={"/logo-3.svg"} width={150} height={100} alt="logo" />
          {/* <p className="text-3xl text-purple-600 font-bold">
            Shop0
          </p> */}
        </div>

        {/* Search Input Column */}
        <div className="col-span-1 relative">
          <Input
            placeholder="Search product ..."
            onChange={(event) => handleSearch(event.target.value)}
            defaultValue={searchParams.get("query"?.toString()) || ""}
            className="w-full  focus:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-secondary  "
          />
          <AiOutlineSearch
            size={16}
            className="absolute top-0 right-0 m-3 font-bold"
            color="black"
          />
        </div>

        {/* Icons Column */}
        <div className="col-span-1 flex gap-5 justify-end items-center">
          <Link href={"/cart"} className="relative">
            <AiOutlineShoppingCart size={20} strokeWidth={2} />
            <span className="absolute bottom-3 text-sm w-5 bg-black h-5font-bold left-2 text-white border border-black rounded-full flex items-center justify-center">
              {/* {cart?.length || 0} */}3
            </span>
          </Link>

          <Link href={"/profile"}>
            <AiOutlineUser size={20} strokeWidth={2} />
          </Link>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SearchNavbar;
