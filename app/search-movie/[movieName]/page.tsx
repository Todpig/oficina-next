"use client";

import {useParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {apiBase} from "@/utils/apiBase";
import Link from "next/link";

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

export default function SearchMovies() {
    const {movieName} = useParams();
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const url = `${apiBase}/search/movie?api_key=${apiKey}&query=${movieName}&page=${currentPage}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                setTotalPages(data.total_pages);
            });
    }, [movieName, currentPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Results for: {movieName}</h1>
            <div className="flex flex-wrap gap-4">
                {movies.map((movie) => (
                    <div key={movie.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                        <Link href={`/detail-movie/${movie.id}`}>
                            <img
                                className="w-full h-64 object-cover"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </Link>
                        <div className="p-4">
                            <h1 className="text-xl font-semibold mb-2">{movie.title}</h1>
                            <p className="text-gray-700">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Previous
                </button>
                <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
