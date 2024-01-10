"use client";

import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { movieData } from "../state";

interface AddMovieData {
  name: string;
  release_date: string;
}

interface AddReviewData {
  movie_id: string | any;
  reviewer_name: string;
  rating: any;
  review_comments: string;
}

const Header = () => {
  const movieList = useRecoilValue(movieData);
  const [addMovieModal, setAddMovieModal] = useState<boolean>(false);
  const [addReviewModal, setAddReviewModal] = useState<boolean>(false);

  const [addMovieData, setAddMovieData] = useState<AddMovieData>({
    name: "",
    release_date: "",
  });

  const [addReviewData, setAddReviewData] = useState<AddReviewData>({
    movie_id: "",
    reviewer_name: "",
    rating: 0,
    review_comments: "",
  });

  const addMovie = () => {
    const payload = addMovieData;
    axios
      .post(`https://moviecritic-server.onrender.com/api/movies`, payload)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/";
      });
  };

  const addReview = () => {
    const payload = addReviewData;
    axios
      .post(`https://moviecritic-server.onrender.com/api/reviews`, payload)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/";
      });
  };

  console.log(addReviewData);

  return (
    <div className="w-full flex justify-between px-5 py-3 items-center bg-[#e3e8ed]">
      <Link href={"/"} className="text-xl text-gray-800">
        MOVIECRITIC
      </Link>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setAddMovieModal(true)}
          className="text-[#6558f5] border border-[#6558f5] bg-white px-3 py-2 rounded"
        >
          Add New Movie
        </button>
        <button
          onClick={() => setAddReviewModal(true)}
          className=" border bg-[#6558f5] px-3 py-2 text-white rounded"
        >
          Add New Review
        </button>
      </div>
      <Dialog
        open={addMovieModal}
        onClose={() => {
          setAddMovieModal(false);
        }}
      >
        <div className="flex flex-col p-10 space-y-5">
          <span>Add New Movie</span>
          <input
            onChange={(e) =>
              setAddMovieData({ ...addMovieData, name: e.target.value })
            }
            placeholder="Name"
            className="px-3 py-2 border rounded"
          />
          <input
            placeholder="Release Date"
            className="px-3 py-2 border rounded"
            onChange={(e) =>
              setAddMovieData({ ...addMovieData, release_date: e.target.value })
            }
          />
          <div className="flex justify-end w-full">
            <button
              onClick={addMovie}
              className=" border bg-[#6558f5] px-3 py-2 text-white rounded"
            >
              Add Movie
            </button>
          </div>
        </div>
      </Dialog>
      <Dialog open={addReviewModal} onClose={() => setAddReviewModal(false)}>
        <div className="flex flex-col p-10 space-y-5">
          <span>Add New Review</span>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Movie</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Select Movie"
              onChange={(e) =>
                setAddReviewData({ ...addReviewData, movie_id: e.target.value })
              }
            >
              {movieList?.map((movie: any) => (
                <MenuItem value={movie.id}>{movie?.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            placeholder="Your Name"
            className="px-3 py-2 border rounded"
            onChange={(e) =>
              setAddReviewData({
                ...addReviewData,
                reviewer_name: e.target.value,
              })
            }
          />
          <input
            type="number"
            // pattern="[0-9]|10"
            placeholder="Rating out of 10"
            value={addReviewData.rating}
            className="px-3 py-2 border rounded"
            onChange={(e) => {
              if (/^[0-9]{1,10}$/.test(e.target.value)) {
                setAddReviewData({
                  ...addReviewData,
                  rating: e.target.value,
                });
              }
            }}
          />
          <textarea
            placeholder="Review Comments"
            className="px-3 py-2 border rounded"
            onChange={(e) =>
              setAddReviewData({
                ...addReviewData,
                review_comments: e.target.value,
              })
            }
          />
          <div className="flex justify-end w-full">
            <button
              onClick={addReview}
              className=" border bg-[#6558f5] px-3 py-2 text-white rounded"
            >
              Add Review
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Header;
