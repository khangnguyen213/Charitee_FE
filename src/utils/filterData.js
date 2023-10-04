import moment from 'moment';
import Global from '../global';

export const filterDonationData = ({ rawData, time_filter }) => {
  let timeCondition;

  switch (time_filter) {
    case 'DAY':
      timeCondition = moment().add(-30, 'day').toDate();
      break;
    case 'MONTH':
      timeCondition = moment().add(-1, 'year').toDate();
      break;
    case 'YEAR':
      timeCondition = moment().add(-3, 'year').toDate();
      break;

    default:
      break;
  }

  const donations = rawData;

  const start = moment(timeCondition);
  const end = moment().toDate();
  let labels = [];
  let data = [];
  switch (time_filter) {
    case 'DAY':
      while (start.isSameOrBefore(end)) {
        labels.push(start.format('MM-DD'));
        start.add(1, 'day');
      }
      data = labels.reduce((res, item) => {
        const totalDonated = donations
          .filter(
            (donation) => moment(donation.donatedAt).format('MM-DD') === item
          )
          .reduce((total, donation) => total + donation.amount, 0);
        res.push(totalDonated);
        return res;
      }, []);
      break;
    case 'MONTH':
      data = Global.MONTH_NAMES.reduce((res, item) => {
        const currentMonth = Global.MONTH_NAMES.indexOf(item) + 1;
        const totalDonated = donations
          .filter(
            (donation) =>
              +moment(donation.donatedAt).format('MM') === currentMonth
          )
          .reduce((total, donation) => total + donation.amount, 0);
        res.push(totalDonated);
        return res;
      }, []);
      labels = Global.MONTH_NAMES;
      break;
    case 'YEAR':
      while (start.isSameOrBefore(end)) {
        labels.push(start.format('YYYY'));
        start.add(1, 'year');
      }
      data = labels.reduce((res, item) => {
        const totalDonated = donations
          .filter(
            (donation) => moment(donation.donatedAt).format('YYYY') === item
          )
          .reduce((total, donation) => total + donation.amount, 0);
        res.push(totalDonated);
        return res;
      }, []);
      break;

    default:
      break;
  }

  return { labels, data };
};

export const filterCountCauseData = ({ rawData }) => {
  let timeCondition = moment().add(-1, 'year').toDate();
  const causes = rawData;
  const start = moment(timeCondition);
  const end = moment().toDate();
  let labels = [];
  let data = [];

  while (start.isSameOrBefore(end)) {
    labels.push(start.format('YY-MMM'));
    start.add(1, 'month');
  }
  data = labels.reduce((res, item) => {
    const totalCauses = causes.filter(
      (cause) => moment(cause.createdAt).format('YY-MMM') === item
    );
    res.push(totalCauses.length);
    return res;
  }, []);

  return { labels, data };
};

export const filterStatusCauseData = ({ rawData }) => {
  const causes = rawData;
  let labels = ['active', 'finished'];
  let data = [];

  data = labels.reduce((res, item) => {
    const totalCauses = causes.filter((cause) => cause.status === item);
    res.push(totalCauses.length);
    return res;
  }, []);

  return { labels, data };
};
