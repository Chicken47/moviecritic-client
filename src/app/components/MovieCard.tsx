import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface MovieCardProps {
  title: string;
  released: string;
  rating: any;
  id: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  released,
  rating,
  id,
}) => {
  return (
    <Link
      href={`/${id}`}
      className="w-[27%] shadow-lg hover:shadow-xl hover:shadow-gray-400 hover:scale-105 transition-all cursor-pointer rounded bg-[#e0defd] flex flex-col h-[150px] px-5 justify-evenly"
    >
      <span>{title}</span>
      <span className="italic">Released: {released}</span>
      {rating && <span>Rating: {parseFloat(rating).toFixed(1)}/10</span>}
    </Link>
  );
};

export default MovieCard;
