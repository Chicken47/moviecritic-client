"use client";

import React, { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";
import axios from "axios";
import { useParams } from "next/navigation";

interface Review {
  review_comments: string;
  rating: number;
  reviewer_name: string;
}

interface MovieDetails {
  name: string;
  average_rating: any;
}

const MovieDetails = () => {
  const params = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

  useEffect(() => {
    axios
      .get(`http://localhost:6969/api/movies/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setReviews(response.data.reviews);
        setMovieDetails(response.data.movieDetails);
      });
  }, []);

  return (
    <div className="flex flex-col w-screen">
      <div className="flex flex-col p-10 space-y-10">
        <div className="flex items-center justify-between w-full">
          <span className="text-[3vw] font-bold">{movieDetails?.name}</span>
          {reviews.length !== 0 && (
            <span className="text-[2vw]">
              {parseFloat(movieDetails?.average_rating).toFixed(1)}/10
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col px-10 space-y-5">
        {reviews?.map((review) => {
          return (
            <ReviewCard
              review={review?.review_comments}
              rating={review?.rating}
              reviewer={review?.reviewer_name}
            />
          );
        })}
        {reviews.length === 0 && <span>No Reviews Yet! Add One Now!</span>}
      </div>
    </div>
  );
};

export default MovieDetails;
