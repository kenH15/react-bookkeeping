import { groupBy, map, orderBy, reduce } from 'lodash';
import { Moment } from 'moment';
import {
  RecordProps,
  RecordType,
} from '../pages/detail/components/record/Record';

import { DateFormat, formatTimeStamp } from './dateHelper';

//#총 출금 입금
export interface Summary {
  totalIncome: number;
  totalExpense: number;
}

//총 출금 입금 계산
export const getSummary = (records: RecordProps[]): Summary => {
  return reduce(
    records,
    (summary, record) => {
      if (record.type === RecordType.Income) {
        summary.totalIncome += record.price;
      } else {
        summary.totalExpense += record.price;
      }
      return summary;
    },
    { totalIncome: 0, totalExpense: 0 }
  );
};

//dailyRecords group type
export interface GroupedDailyRecords {
  timeStamp: number;
  summary: Summary;
  records: RecordProps[];
}

export const groupDailyRecords = (
  records: RecordProps[]
): GroupedDailyRecords[] => {
  //날짜별 그룹
  const groupedDailyData = groupBy(records, (record) =>
    formatTimeStamp(record.timeStamp)
  );
  //dailyDataList[] 날짜별 데이터 리스트
  const dailyDataList = map(Object.keys(groupedDailyData), (day) => {
    const dailyRecords = groupedDailyData[day];
    const summary = getSummary(dailyRecords); //당일 총 지출 수입 계산
    return {
      timeStamp: dailyRecords[0].timeStamp,
      summary,
      records: orderBy(dailyRecords, ['timeStamp'], ['desc']), //당일 데이터 정렬
    };
  });
  return orderBy(dailyDataList, ['timeStamp'], ['desc']);
};


export interface DailySummary extends Summary{
  date:number
}

//한달의 매일 지출/수입
export const getDailySummaryInMonth = (
  records:RecordProps[],month:Moment,
):DailySummary[]=>{
  const days = month.daysInMonth()

  const resultOfPayment = groupDailyRecords(records).map((d)=>({
    date:parseInt(formatTimeStamp(d.timeStamp,DateFormat.Day)),
    totalIncome:d.summary.totalIncome,
    totalExpense:d.summary.totalExpense,
  }))
  

  const result= []
  for (let i =1; i<=days;i++){
    const payment = resultOfPayment.find((d)=>d.date===i)
    result.push(payment||{date:i,totalExpense:0,totalIncome:0})
  }
  return result
}