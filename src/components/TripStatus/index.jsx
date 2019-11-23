import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { HorizontalBar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

const labels = ['Station1', 'Station2', 'Station3', 'Station4', 'Station5', 'Station6', 'Station7'];

const lineData = {
    labels: labels,
    datasets: [
        {
            label: 'Booking Numbers',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const horizontalData = {
    labels: ['Credit Card', 'Cash'],
    datasets: [
        {
            label: 'Paid Amount',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const doughnutData = {
    labels: [
        'Arrived early',
        'On Time',
        'Late'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

const pieData = {
    labels: [
        'Missed',
        'Completed',
        'Canceled'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

export default class ChartsDemo extends Component {
    render() {
        return (
            <div>
                <h2>Lateness on every station</h2>
                <Doughnut data={doughnutData} />

                <h2>Customers’ status</h2>
                <Pie ref="chart" data={pieData} />

                <h2>A plot</h2>
                <Line ref="chart" data={lineData} />

                <h2>Customers payslip</h2>
                <HorizontalBar ref="chart" data={horizontalData} />

            </div>
        );
    }

    componentDidMount() {
        const { datasets } = this.refs.chart.chartInstance.data
        console.log(datasets[0].data);
    }
}