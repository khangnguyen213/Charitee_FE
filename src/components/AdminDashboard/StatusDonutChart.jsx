import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { filterStatusCauseData } from '../../utils/filterData';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusDonusChart = (props) => {
  const { labels, data } = filterStatusCauseData({ rawData: props.rawData });
  return (
    <Doughnut
      data={{
        labels: labels.map((label) => label.toUpperCase()),
        datasets: [
          {
            data,
            backgroundColor: ['#fef08a', '#fca5a5', '#bbf7d0'],
            borderColor: ['#facc15', '#ef4444', '#4ade80'],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }}
    />
  );
};

export default StatusDonusChart;
