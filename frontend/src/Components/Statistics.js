import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


const Statistics = ({ para }) => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const month = useSelector((state) => state.month);

    useEffect(() => {
        fetchData();
    }, [month]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/statistics?month=${month}`);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl font-3xl mb-6">Statistics - {arr[month-1]}</h1>
                    <div className="relative overflow-x-hidden shadow-md sm:rounded-lg">
                        <table className="w-full flex text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody className="w-8/12">
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Total Sale
                        </th>
                        <td className="px-6 py-4">
                            {data.total_sale_amount}
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Total Sold Items
                        </th>
                        <td className="px-6 py-4">
                            {data.total_sold_items}
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Total Not Sold Items
                        </th>
                        <td className="px-6 py-4">
                            {data.total_not_sold_items}
                        </td>
                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
