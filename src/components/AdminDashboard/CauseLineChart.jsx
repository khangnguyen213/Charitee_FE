import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
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
  Legend,
  Filler
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
            borderColor: '#f97316',
            backgroundColor: '#fed7aa',
            fill: true,
          },
        ],
      }}
    />
  );
};

export default CauseLineChart;
