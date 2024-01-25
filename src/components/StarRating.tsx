// StarRating.js

import React, { FC, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";
import { FaStarHalf } from "react-icons/fa";
// import { StarRatingProps } from '@/types/customRatingStar';

const StarRating: FC<any> = ({ totalStars = 5, initialRating = 0, onRate }) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
    if (onRate) {
      onRate(starIndex + 1);
    }
  };

  const renderStar = (starIndex: number) => {
    const isHalf = rating - starIndex === 0.5;
    return (
      <motion.div
        key={starIndex}
        className="cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => handleStarClick(starIndex)}
      >
        {isHalf ? (
          <FaStarHalf className="text-yellow-500 text-2xl" />
        ) : rating > starIndex ? (
          <AiFillStar className="text-yellow-500 text-2xl" />
        ) : (
          <AiOutlineStar className="text-gray-400 text-2xl" />
        )}
      </motion.div>
    );
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;
