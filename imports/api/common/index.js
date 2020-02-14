import moment from 'moment';

export const getPeriod = (months = 0, period = []) =>
  parseInt(
    moment(...period)
      .add(months, 'months')
      .format('YYYYMM')
  );

export const formatPeriod = period =>
  moment(period, 'YYYYMM').format('MMM YYYY');
