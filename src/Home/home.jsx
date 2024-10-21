import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/pagination';
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchMovies = async (page = 1) => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=526ad75264a03e430f8b5d27573eeebb&query=movies&page=${page}`
                );
                const data = await response.json();
                setMovies(data.results); // You can append results if fetching multiple pages
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
            setLoading(false);
        };


        fetchMovies();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = movies.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Paging Method</h1>
            <center>
                <Link to="/">
                    <button className=' rounded-lg items-center w-40 h-12 ml-3 bg-blue-300 font-bold text-black' >
                        Back
                    </button>
                </Link>
            </center>
            <br />
            {/* Display loading message while fetching */}
            {loading ? (
                <p className="text-center text-xl">Loading movies...</p>
            ) : (
                <div>
                    {/* Movie Cards */}
                    <div className="grid grid-cols-3 gap-6">
                        {currentItems.map((movie) => (
                            <div key={movie.id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white flex flex-col items-center">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-lg h-40 w-full object-cover mb-2"
                                />
                                <h2 className="text-lg font-semibold text-center">{movie.title}</h2>
                                <p className="text-gray-600 text-sm truncate text-center text-wrap">{movie.overview.slice(0, 100)}.......</p>
                                <p className="text-blue-600 font-bold mt-2">Rating: {movie.vote_average}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Component */}
                    <div className="flex justify-center mt-6">
                        <Pagination
                            itemsPerPage={itemsPerPage}
                            totalItems={movies.length}
                            paginate={paginate}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
