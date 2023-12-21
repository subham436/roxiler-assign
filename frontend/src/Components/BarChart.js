import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';

const BarChart = () => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const month = useSelector((state) => state.month);

    const arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    useEffect(() => {
        fetchData();
    }, [ month]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/product/bar-chart?month=${month}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching bar chart data:', error);
        }
    };

    const renderChart = () => {
        const chartData = {
            labels: Object.keys(data),
            datasets: [
                {
                    label: 'Frequency',
                    data: Object.values(data),
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
        
        const options = {
            maintainAspectRatio: false, 
            scales: {
                x: {
                    display: true,
                },
                y: {
                    display: true,
                },
            },
        };

        return <Bar data={chartData} options={options} />;
    };

    return (
        <div className="bg-gray-100 h-80vh py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-3 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h1 className="text-2xl font-3xl mb-6">Bar Chart Stats - {arr[month-1]}</h1>
                    <div className='w-[700px] mx-auto h-[60vh]'>
                        {renderChart()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BarChart;
