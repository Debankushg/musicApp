"use client"
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);
const Default = () => {
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
    return (
        <div>
            <h2 className="text-2xl my-2">Welcome to Expsenso Profile</h2>
            <Doughnut data={data} />
        </div>
    )
}

export default Default
