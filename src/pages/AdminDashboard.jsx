import React, { useEffect, useState } from 'react';
import Global from '../global';
import axios from 'axios';
import InformationCards from '../components/AdminDashboard/InformationCard';
import CauseLineChart from '../components/AdminDashboard/CauseLineChart';
import StatusDonutChart from '../components/AdminDashboard/StatusDonutChart';
import DonationLineChart from '../components/AdminDashboard/DonationLineChart';
import { useSelector } from 'react-redux';
import NotFoundPage from './NotFoundPage';
import LoadingScreen from '../components/Global/LoadingScreen';

const AdminDashboard = () => {
  const [countAccount, setCountAccount] = useState(0);
  const [causes, setCauses] = useState();
  const [donations, setDonations] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const sessionRole = useSelector((state) => state.session.role);

  useEffect(() => {
    setIsLoading(true);
    axios
      .all([
        axios.get(`${Global.BASE_BACKEND_API}/account`, {
          withCredentials: true,
        }),
        axios.get(`${Global.BASE_BACKEND_API}/cause`, {
          withCredentials: true,
        }),
        axios.get(`${Global.BASE_BACKEND_API}/donations`, {
          withCredentials: true,
        }),
      ])
      .then(
        axios.spread((account, cause, donation) => {
          setCountAccount(account.data.count);
          setCauses(cause.data);
          setDonations(donation.data);
          setIsLoading(false);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {['admin', 'master'].includes(sessionRole) && !isLoading && (
        <div className="flex flex-wrap items-center justify-between pt-2 mx-8">
          <>
            <h1 className="text-[#F15B43] font-['Rubik'] font-bold text-3xl md:text-4xl text-center box-border w-full mb-2">
              ADMIN DASHBOARD
            </h1>
            <div className="border-2 border-[#F15B43] m-2 py-2 px-4 rounded-md w-full">
              <h1 className="text-[#F15B43]  font-['Rubik'] text-center font-bold text-xl md:text-2xl box-border w-full">
                OVERVIEW
              </h1>
              {countAccount && causes && donations && (
                <InformationCards
                  data={{
                    countAccount,
                    countCause: causes.count,
                    countDonation: donations.count,
                    totalDonation: donations.total.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }),
                  }}
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-[#F15B43] m-2 rounded-md w-full md-1:w-[60%] md-1:min-h-[420px]">
              <h1 className="text-[#F15B43] font-['Rubik'] text-center font-bold text-xl md:text-2xl box-border w-full">
                NUMBER OF CAUSE
              </h1>
              <div className="min-w-[378px] w-full my-4">
                {causes && <CauseLineChart rawData={causes.causes} />}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 border-2 border-[#F15B43] m-2 rounded-md w-full md-1:w-[35%] md-1:min-h-[420px]">
              <h1 className="text-[#F15B43] font-['Rubik'] text-center font-bold text-xl md:text-2xl box-border w-full">
                CAUSE PROGRESS
              </h1>
              <div className="min-w-[189px] w-full my-4 flex justify-center">
                {causes && <StatusDonutChart rawData={causes.causes} />}
              </div>
            </div>
            <div className="border-2 border-[#F15B43] m-2 py-2 px-4 rounded-md w-full">
              <h1 className="text-[#F15B43] font-['Rubik'] text-center font-bold text-xl md:text-2xl box-border w-full">
                DONATION OVERVIEW
              </h1>
              {donations && (
                <div className="w-full my-4 flex justify-center flex-wrap">
                  <DonationLineChart rawData={donations.results} />
                </div>
              )}
            </div>
          </>
        </div>
      )}
      {!['admin', 'master'].includes(sessionRole) && <NotFoundPage />}
    </>
  );
};

export default AdminDashboard;
