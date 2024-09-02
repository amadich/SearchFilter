"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchContainer({ filter }: { filter: string }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://mydatatime.amadich.tn/api/mydata');
                setData(response.data.characters); // Fetch the character data
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError('Error fetching data');
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Filter the data based on the filter prop
    const filteredData = data.filter((item: any) =>
        item.displayName.toLowerCase().includes(filter.toLowerCase()) ||
        item.fullName.toLowerCase().includes(filter.toLowerCase()) ||
        item.species.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
        <div id='searchContainer'>
            {filteredData.length > 0 ? (
                filteredData.map((item: any) => (
                    <div key={item.id} className=" justify-center items-center">
                        <div className=" flex flex-row justify-center items-center relative m-4 p-4 bg-gray-100 rounded-lg shadow-lg">
                            {/* Image with hover effect */}
                            <img
                                src={item.sprite}
                                alt={item.displayName}
                                className="w-20 h-20 rounded-full cursor-pointer"
                                onMouseEnter={(e) => {
                                    const tooltip = document.getElementById(`tooltip-${item.id}`);
                                    if (tooltip) {
                                        tooltip.style.opacity = '1';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const tooltip = document.getElementById(`tooltip-${item.id}`);
                                    if (tooltip) {
                                        tooltip.style.opacity = '0';
                                    }
                                }}
                            />
                            {/* Tooltip for quotes */}
                            <div
                                id={`tooltip-${item.id}`}
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 transition-opacity duration-300"
                                style={{ zIndex: 1000 }}
                            >
                                {item.quotes.map((quote: string, index: number) => (
                                    <p key={index} className="mb-1">"{quote}"</p>
                                ))}
                            </div>
                            <div className="text-center">
                                <h2 className="text-lg font-semibold">{item.displayName}</h2>
                                <p className="text-sm text-gray-500">{item.species}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className='p-10'>No matching results found.</p>
            )}
         </div>
        </>
    );
}
