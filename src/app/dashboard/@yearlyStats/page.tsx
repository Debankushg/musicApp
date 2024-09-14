"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register the required chart components and scales
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const YearlyStats = () => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels: labels,
        datasets: [
            {
                axis: 'x',
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: '#0000ff',
                barPercentage: 0.5,  // Adjust the bar width
                categoryPercentage: 0.5,
            },
            {
                axis: 'x',
                label: 'My Second Dataset',
                data: [35, 49, 56, 31, 66, 85, 10],
                fill: false,
                backgroundColor: 'rgb(255, 205, 86)',
                barPercentage: 0.5,  // Adjust the bar width
                categoryPercentage: 0.5,
            },
            {
                axis: 'x',
                label: 'My Second Dataset',
                data: [35, 49, 56, 31, 66, 85, 10],
                fill: false,
                backgroundColor: 'rgb(255, 25, 86)',
                barPercentage: 0.5,  // Adjust the bar width
                categoryPercentage: 0.5,
            },
            {
                axis: 'x',
                label: 'My Last Dataset',
                data: [35, 49, 56, 31, 66, 85, 10],
                fill: false,
                backgroundColor: 'rgb(255, 95, 444)',
                barPercentage: 0.5,  // Adjust the bar width
                categoryPercentage: 0.5,
            },

        ],
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,  // Remove grid lines on the x-axis
                },
            },
            y: {
                grid: {
                    display: false,  // Remove grid lines on the y-axis
                },
            },
        },
    };

    return (
        <div className='m-2 bg-slate-100  p-4 h-full'>
            <h2 className="text-md my-2">Welcome to Expsenso Yearly Stats</h2>
            <div className=" ">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default YearlyStats;
