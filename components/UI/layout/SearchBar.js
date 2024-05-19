import LoadingSpinner from '@/components/allProducts/LoadingSpinner';
import useDebounce from '@/hooks/useDebounce';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";


export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedSearch) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5059/api/product?PageIndex=1&PageSize=5&productName=${debouncedSearch}`);
                    setResults(response.data.data.products);
                    setShowResults(true);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    setShowResults(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setShowResults(false);
            }
        };

        fetchResults();
    }, [debouncedSearch]);

    return (
        <div className="relative flex  items-center w-1/2">
            <div className="p-2 flex gap-2 border border-gray-300 text-gray-400 items-center rounded-full flex-1">
                <label htmlFor="search-input">
                    <IoSearchOutline className="text-2xl " />
                </label>
                <input
                    id="search-input"
                    type="text"
                    className='text-black flex-1 outline-none'
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {showResults && (
                <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {loading ? (
                        <div className="p-2"><LoadingSpinner></LoadingSpinner></div>
                    ) : (
                        <ul>
                            {results.length > 0 && results.map((result, index) => (
                                <li key={index} className="p-2 border-b last:border-b-0">
                                    <div className="flex items-center">
                                        <img src={result.imagePath} alt="Product Image" className="w-20 h-20 mr-4" />
                                        <div>
                                            <div>{result.productName}</div>
                                            <p className='text-sm'>{result.brand}</p>
                                            <p className='text-primary'>{result.price} TL</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {results.length === 0 && (
                                <li className="p-2">No results found</li>
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

