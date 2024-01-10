"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import axios from "axios";
import { Dialog, Modal } from "@mui/material";
import { useRecoilState } from "recoil";
import { movieData } from "./state";

export default function Home() {
  const [movieList, setMovieList] = useRecoilState<any>(movieData);

  useEffect(() => {
    axios
      .get("https://moviecritic-server.onrender.com/api/movies")
      .then((response) => {
        console.log(response);
        setMovieList(response.data);
      });
  }, []);

  return (
    <main className="flex flex-col w-screen">
      <div className="flex flex-col w-full p-10 space-y-9">
        <span className="text-[3vw]">The Best Movie Reviews Site!</span>
        <input
          className="w-1/2 px-4 py-2 border rounded"
          placeholder="Search Your Favourite Movie"
        />
        <div className="flex flex-wrap w-full gap-10 p-5 justify-evenly">
          {movieList?.map((item: any, index: any) => {
            return (
              <MovieCard
                title={item?.name}
                key={index}
                rating={item?.average_rating}
                released={item?.release_date}
                id={item?.id}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
