import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full mt-10 bg-card  border dark:border-none">
      <div className="flex items-center justify-center p-10">
        <Image src={"/logo-3.svg"} alt="logo" height={200} width={200} />
      </div>
      {/* <hr /> */}
      <footer className="grid w-full grid-cols-1 gap-4 p-5 mx-auto text-center border-none sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 max-w-7xl ">
        <div className="flex flex-col gap-3 border-none">
          <h1 className="text-sm font-bold">About Us</h1>
          <p className="text-gray-500">
            We know there are a lot of thread developers out there, but we take
            pride in being a firm in the industry.
          </p>

          <ul>
            <li>
              <Link href={"/"} className="text-gray-500"></Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-sm font-bold">Feature</h1>

          <ul>
            <li>
              <Link href={"/"} className="text-gray-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-gray-500">
                Term Condition
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-gray-500">
                Best Product
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-sm font-bold">General Links</h1>

          <ul>
            <li>
              <Link href={"/"} className="text-gray-500">
                Blog
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-gray-500">
                Tracking Order
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-gray-500">
                Become a Seller
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-sm font-bold">Helpful</h1>

          <ul>
            <li>
              <Link href={"/"} className="text-gray-500">
                Flash Sale
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-gray-500">
                FAQ
              </Link>
            </li>
            <li>
              <Link href={"/"} className="text-gray-500">
                Support
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="w-full p-5 pt-4 mt-4 border dark:border-none 0">
        <div className="flex items-center justify-center">
          &copy; 2022 Hariom Mahato. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
