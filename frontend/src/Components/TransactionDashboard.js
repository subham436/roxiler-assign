import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMonth } from '../Redux Store/store';

const TransactionDashboard = () => {
    const dispatch = useDispatch();
    const month = useSelector((state) => state.month);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [totalTransactions, setTotalTransactions] = useState(0);



    useEffect(() => {
        fetchTransactions();
    }, [month, search, page, perPage]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/product/allTransactions?month=${month}&search=${search}&page=${page}&per_page=${perPage}`
            );
            setTransactions(response.data.transactions);
            console.log(transactions);
            setTotalTransactions(response.data.total);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleMonthChange = (e) => {
        // setMonth(parseInt(e.target.value));
        const newMonth = parseInt(e.target.value);
        dispatch(setMonth(newMonth));
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handlePerPageChange = (e) => {
        setPerPage(parseInt(e.target.value));
    };

    const handlePreviousPage = () => {
        setPage(page > 1 ? page - 1 : 1);
    };

    const handleNextPage = () => {
        setPage(page < 10 ? page + 1 : 10);
    };

    return (
        <>
            <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3  sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className='w-full flex justify-center'>
                            <h1 className='text-2xl font-3xl'>Transaction Dashboard</h1>
                        </div>
                        <div className="mt-5 space-y-2 justify-between flex flex-row gap-6">
                            <div className="relative pt-0">
                                <label htmlFor="search" className="leading-7 text-sm text-gray-600">Search</label>
                                <input id="search" value={search} onChange={handleSearch} className="w-full px-4 py-2 border border-gray-300 rounded-md text-base leading-6 text-gray-900 bg-white hover:border-gray-500 focus:outline-none focus:border-blue-300" />
                            </div>
                            <div className="relative">
                                <label htmlFor="month" className="leading-7 text-sm text-gray-600">Month</label>
                                <select id="month" value={month} onChange={handleMonthChange} className="w-full px-4 py-2 border border-gray-300 rounded-md text-base leading-6 text-gray-900 bg-white hover:border-gray-500 focus:outline-none focus:border-blue-300">
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                        </div>

                        <table className="w-full text-center">
                            <thead>
                                <tr>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Id</th>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Title</th>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Description</th>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Price</th>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Category</th>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Sold</th>
                                    <th className="text-center px-6 py-3 border-b-2 border-gray-300">Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((item) => (
                                    <tr key={item.id} className="text-center">
                                        <td className="px-6 py-3 border-b border-gray-300">{item.id}</td>
                                        <td className="px-6 py-3 border-b border-gray-300">{item.title}</td>
                                        <td className="px-6 py-3 border-b border-gray-300">{item.description}</td>
                                        <td className="px-6 py-3 border-b border-gray-300">{item.price}</td>
                                        <td className="px-6 py-3 border-b border-gray-300">{item.category}</td>
                                        <td className="px-6 py-3 border-b border-gray-300">{item.sold ? 'Available' : 'Sold'}</td>
                                        <td className="px-6 py-3 border-b border-gray-300"><img src={item.image} alt={item.title} /></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='mt-8 flex justify-between'>
                            <div>
                                Page No. {page}
                            </div>
                            <div className="flex justify-center gap-8">
                                <button onClick={handlePreviousPage} disabled={page === 1} className=" h-[45px] text-white bg-[#22d3ee] hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Previous</button>
                                <button onClick={handleNextPage} disabled={page === 10} className="h-[45px] text-white bg-[#22d3ee] hover:bg-red-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Next</button>
                            </div>
                            <div className="relative pt-0">
                                <label htmlFor="perPage" className="leading-7 text-sm text-gray-600">Results per page</label>
                                <select id="perPage" value={perPage} onChange={handlePerPageChange} className="w-full px-4 py-2 border border-gray-300 rounded-md text-base leading-6 text-gray-900 bg-white hover:border-gray-500 focus:outline-none focus:border-blue-300">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8">


                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default TransactionDashboard;