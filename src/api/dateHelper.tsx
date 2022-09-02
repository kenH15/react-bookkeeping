import moment, { Moment } from 'moment';

export enum DateFormat {
  MONTH_DAYOFWEEK = 'MMMDo dddd',
  YEAR_MONTH_DAY = 'YYYY-MM-DD',
  Day = 'D',
}

export const formatTimeStamp = (
  timeStamp: number,
  format = DateFormat.YEAR_MONTH_DAY
) => {
  return moment(timeStamp).format(format);
};

//한달의 시작 과 끝
export const getMonthRange = (month: Moment) => {
  const start = moment(month).startOf('month').valueOf();
  const end = moment(month).endOf('month').valueOf();
  return [start, end];
};

export const isSameMonth = (timeStamp: number, currentMonth: Moment) => {
  const month = moment(timeStamp);
  return (
    month.isSame(currentMonth, 'year') && month.isSame(currentMonth, 'month')
  );
};


