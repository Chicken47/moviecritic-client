import React from "react";

interface MovieCardProps {
  review: string;
  reviewer: string;
  rating: number;
}

const ReviewCard: React.FC<MovieCardProps> = ({ review, reviewer, rating }) => {
  return (
    <div className="flex justify-between p-4 border-2 rounded shadow-inner bg-violet-200">
      <div className="flex flex-col gap-4">
        <span>{review}</span>
        <span>By {reviewer}</span>
      </div>
      <div>{rating}/10</div>
    </div>
  );
};

export default ReviewCard;
