import React from 'react'
import { Pie } from 'react-chartjs-2';

function PieChart(props) {

    const options = {
        title: {
          display: true,
          text: "Tickets Priority",
        }
    }
    const data = {
        labels: [
            'High',
            'Medium',
            'Low'
        ],
        
        datasets: [{
            data: [props.pieData['high']?.length, props.pieData['medium']?.length, props.pieData['low']?.length],
            backgroundColor: [
                'rgba(255,99,132,0.8)',
                'rgba(54,162,235,0.8)',
                'rgba(255,206,86,0.8)'
            ],
            hoverBackgroundColor: [
                'rgba(255,99,132,1)',
                'rgba(54,162,235,1)',
                'rgba(255,206,86,1)'
            ]
        }]
    }

    return (
        <div>
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart
