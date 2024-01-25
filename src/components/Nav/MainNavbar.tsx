"use client";
import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import {
  motion, // Import motion from framer-motion
  AnimatePresence, // Import AnimatePresence for smooth showing/hiding of elements
} from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { categoriesMenu, navMenu } from "@/lib/navMenu";
import { useRouter } from "next/navigation";
import Link from "next/link";

import SmallNavbar from "./SmallNavbar";

const MainNavbar = () => {
  const router = useRouter();
  const isNavMenuVisible = navMenu && navMenu.length > 0;
  const [openSmallNav, setOpenSmallNav] = useState<boolean>(false);

  const toggleSmallNavbar = () => {
    setOpenSmallNav(!openSmallNav);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setOpenSmallNav(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-full flex items-center border  bg-primary-foreground dark:border-none ">
        <div className="container flex justify-between items-center gap-4 p-3 md:w-[80%] ">
          {/* Dropdown Menu on the left */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Wrap Button with motion.div for animations */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="default" className="w-40">
                    Categories
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categoriesMenu?.map((item, i) => (
                  <DropdownMenuItem key={i}>{item?.label}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navlinks in the middle (hidden on small screens) */}
          {isNavMenuVisible && (
            <motion.div
              className="hidden sm:flex justify-center gap-10 items-center text-sm "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {navMenu?.map((item, i) => (
                <Link
                  href={item?.label == "Home" ? "/" : item?.label}
                  key={i}
                  className=" font-bold uppercase text-foreground"
                >
                  {item?.label}
                </Link>
              ))}
            </motion.div>
          )}

          {/* Button and Menu on the right */}
          <div className="flex items-center">
            <Button
              // variant={"ghost"}
              className="animate-in zoom-in duration-500 bg-rose-600"
              onClick={() => router.push("/seller/become-seller")}
            >
              Become a seller
            </Button>
            {/* Wrap Menu with motion.div for animations */}
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <IoMdMenu
                className="block sm:hidden"
                onClick={toggleSmallNavbar}
              />
            </motion.div>
          </div>
        </div>

        {/* AnimatePresence for smooth showing/hiding of SmallNavbar */}
        <AnimatePresence>
          {openSmallNav && (
            <motion.div
              className="absolute top-full left-0 w-full mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <SmallNavbar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MainNavbar;
