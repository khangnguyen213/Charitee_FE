import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { filterCountCauseData } from '../../utils/filterData';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CauseLineChart = (props) => {
  const { labels, data } = filterCountCauseData({ rawData: props.rawData });

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: 'Number of new causes',
            data,
            borderColor: '#ea580c',
            backgroundColor: '#fb923c',
            fill: true,
          },
        ],
      }}
    />
  );
};

export default CauseLineChart;
