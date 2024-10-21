import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LoadMore = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleItems, setVisibleItems] = useState(5);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?api_key=526ad75264a03e430f8b5d27573eeebb&query=movies&page=${page}`
                );
                const data = await response.json();
                setMovies(prevMovies => [...prevMovies, ...data.results]);
                setTotalResults(data.total_results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
            setLoading(false);
        };

        fetchMovies();
    }, [page]);

    const handleLoadMore = () => {
        if (visibleItems < totalResults) {
            setVisibleItems(prevVisibleItems => prevVisibleItems + 5);
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMovies([]);
        setPage(1);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=526ad75264a03e430f8b5d27573eeebb&page=1`
            );
            const data = await response.json();
            setMovies(data.results);
            setTotalResults(data.total_results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setLoading(false);
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollTop(true);
        } else {
            setShowScrollTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Movies List</h1>
            <center>
                <Link to="/Home">
                    <button className=' rounded-lg items-center w-40 h-12 ml-3 bg-blue-300 font-bold text-black' >
                        Go to Paging
                    </button>
                </Link>
            </center>
            <br />
            <center>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        placeholder='Search...'
                        onChange={(e) => setInputValue(e.target.value)}
                        className='border border-black rounded-lg pl-3'
                    />
                    <button type='submit' className='border border-black rounded-lg items-center w-20 ml-3 bg-slate-100'>
                        Search
                    </button>
                </form>
            </center>

            {loading && page === 1 ? (
                <p className="text-center text-xl">Loading movies...</p>
            ) : (
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {movies.slice(0, visibleItems).map((movie) => (
                            <div key={movie.id} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded-lg h-60 w-full object-cover mb-2"
                                />
                                <h2 className="text-lg font-semibold mb-1">{movie.title}</h2>
                                <p className="text-gray-600 truncate">{movie.overview}</p>
                                <p className="text-blue-600 font-bold mt-2">Rating: {movie.vote_average}</p>
                            </div>
                        ))}
                    </div>

                    {visibleItems < totalResults && (
                        <div className="text-center mt-6">
                            <button
                                onClick={handleLoadMore}
                                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            )}

            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
                >
                    ↑
                </button>
            )}
        </div>
    );
};

export default LoadMore;
