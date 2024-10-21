import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    // Calculate total number of pages
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="flex justify-center space-x-2">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 border rounded-full ${currentPage === number
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
                                } transition-colors duration-300`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
