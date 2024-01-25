import Link from "next/link";
import React from "react";

const TopBar = () => {
  return (
    <div className="w-full  border dark:border-none bg-background p-3">
      <div className="flex gap-5 w-[80%] m-auto ">
        <Link className="text-sm hover:underline hover:cursor-pointer" href={"/account"}>Account</Link>
        <Link className="text-sm hover:underline hover:cursor-pointer" href={"/trackorder"}>Track Order</Link>
        <Link className="text-sm hover:underline hover:cursor-pointer" href={"/account"}>Support</Link>
      </div>
    </div>
  );
};

export default TopBar;
