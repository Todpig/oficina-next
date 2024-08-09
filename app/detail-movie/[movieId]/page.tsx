"use client";

import {useParams} from 'next/navigation';
import {useCallback, useEffect, useState} from "react";
import {apiBase} from "@/utils/apiBase";

interface MovieProps {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export default function DetailMovie() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState<MovieProps | null>(null);

    const fetchMovie = useCallback(async () => {
        try {
            const apiKey = process.env.NEXT_PUBLIC_API_KEY;
            const url = `${apiBase}/movie/${movieId}?api_key=${apiKey}`
            const response = await fetch(url);
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    }, [movieId]);

    useEffect(() => {
        fetchMovie();
    }, [movieId, fetchMovie]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div key={movie.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img
                    className="w-full h-64 object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                    <p className="text-gray-700 mb-2"><strong>Original Title:</strong> {movie.original_title}</p>
                    <p className="text-gray-700 mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
                    <p className="text-gray-700 mb-2"><strong>Language:</strong> {movie.original_language}</p>
                    <p className="text-gray-700 mb-2"><strong>Vote Average:</strong> {movie.vote_average}</p>
                    <p className="text-gray-700 mb-2"><strong>Vote Count:</strong> {movie.vote_count}</p>
                    <p className="text-gray-700"><strong>Overview:</strong> {movie.overview}</p>
                </div>
            </div>
        </div>
    );
}
