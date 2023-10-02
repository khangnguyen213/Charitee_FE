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
import { filterDonationData } from '../../utils/filterData';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DonationLineChart = (props) => {
  const [filteredData, setFilteredData] = useState();
  const [filterType, setFilterType] = useState('MONTH');
  useEffect(() => {
    setFilteredData(
      filterDonationData({
        rawData: props.rawData,
        time_filter: filterType,
      })
    );
  }, [filterType, props.rawData]);
  return (
    <>
      <div className="w-full flex justify-around items-center flex-wrap">
        <div className='font-["Rubik] font-bold'>
          Amount of donated money in each period:
        </div>
        <div
          className="m-1 inline-flex w-fit rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-orange-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-orange-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-orange-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          role="toolbar"
        >
          <button
            type="button"
            className="inline-block rounded-l bg-orange-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-orange-600 focus:bg-orange-600 focus:outline-none focus:ring-0 active:bg-orange-700"
            data-te-ripple-init
            onClick={() => setFilterType('DAY')}
            data-te-ripple-color="light"
          >
            DAY
          </button>
          <button
            type="button"
            className="inline-block bg-orange-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-orange-600 focus:bg-orange-600 focus:outline-none focus:ring-0 active:bg-orange-700"
            data-te-ripple-init
            onClick={() => setFilterType('MONTH')}
            data-te-ripple-color="light"
          >
            MONTH
          </button>
          <button
            type="button"
            className="inline-block rounded-r bg-orange-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-orange-600 focus:bg-orange-600 focus:outline-none focus:ring-0 active:bg-orange-700"
            data-te-ripple-init
            onClick={() => setFilterType('YEAR')}
            data-te-ripple-color="light"
          >
            YEAR
          </button>
        </div>
      </div>
      {filteredData && (
        <Line
          className="w-full max-h-[75vh]"
          plugins={[
            {
              afterDraw: function (chart) {
                if (chart.data.datasets[0].data.every((item) => item === 0)) {
                  let ctx = chart.ctx;
                  let width = chart.width;
                  let height = chart.height;

                  chart.clear();
                  ctx.save();
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText('No data to display', width / 2, height / 2);
                  ctx.restore();
                }
              },
            },
          ]}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => {
                    if (parseInt(value) >= 1000) {
                      return (
                        '$' +
                        value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      );
                    } else {
                      return '$' + value;
                    }
                  },
                },
              },
            },
          }}
          data={{
            labels: filteredData.labels,
            datasets: [
              {
                label: 'Amount of raised fund ($)',
                data: filteredData.data,
                lineTension: 0.3,
                backgroundColor: '#fdba74',
                borderColor: '#f97316',
                fill: true,
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default DonationLineChart;
