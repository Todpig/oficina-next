"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const [movieName, setMovieName] = useState('');
    const router = useRouter();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (movieName.trim()) {
            router.push(`/search-movie/${movieName}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Home Page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    placeholder="Search movie"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    className="border p-2 mb-4 w-64"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-64">
                    Search
                </button>
            </form>
        </div>
    );
}
