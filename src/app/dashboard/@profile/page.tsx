"use client"
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);


const Profile = () => {

    const data = {
        labels: [
            'expenses',
            'Income',
            'Savings',
            "Annual Revenue",
            "Monthly Revenue",
            "Weekly Revenue",
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        },
        {
            label: 'My First Dataset',
            data: [30, 50, 100],
            backgroundColor: [
                '#ff0000',
                '#0000ff',
                '#28a745'
            ],
            cutout: '70%',
            hoverOffset: 4
        }]
    }


    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    generateLabels: (chart: any) => {
                        const datasets = chart.data.datasets;
                        const labels = chart.data.labels;
                        return labels.map((label: string, index: number) => {
                            const datasetIndex = Math.floor(index / datasets[0].data.length);
                            return {
                                text: label,
                                fillStyle: datasets[datasetIndex].backgroundColor[index % datasets[0].data.length],
                            };
                        });
                    },
                },
            },
        },
    };
    return (
        <div className='m-2 bg-slate-100 p-4'>
            <h2 className="text-md my-2">Welcome to Expsenso Profile</h2>
            <div className='h-full'>

                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}

export default Profile
