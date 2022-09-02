import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getDailySummaryInMonth } from '../../api/recordHelper';
import { RootState } from '../../reducers';
import { State } from '../../reducers/operate ';
import LineChartInMonth from './components/lineChart/LineChartInMonth';
import '../chart/ChartPage.css';
const ChartPage: FC = () => {
  //selector reducer 从全局获取records
  const operate: State = useSelector((state: RootState) => state.operate);
  const dailySummaryInMonth = getDailySummaryInMonth(
    operate.monthlyRecords,
    operate.month
  );
  return (
    <div className='chart-page'>
      <div className='chart-page--content'>
        <LineChartInMonth month={operate.month.month()+1} title={'통계'} data={dailySummaryInMonth} />
      </div>
    </div>
  );
};

export default ChartPage;
