import React, { FC } from 'react';
import Record, { RecordProps } from '../record/Record';
import './DailyRecords.css';
import { GroupedDailyRecords } from '../../../../api/recordHelper';
import { formatTimeStamp, DateFormat } from '../../../../api/dateHelper';

interface DailyRecordsProps extends GroupedDailyRecords {
  onOpenUpdateModal: (id: number) => void;
  onDeleteRecord: (id: number) => void;
}

//해당 날짜의 모든 항목
const DailyRecords: FC<DailyRecordsProps> = ({
  records,
  summary,
  timeStamp,
  onOpenUpdateModal,
  onDeleteRecord,
}) => {
  return (
    <div className='daily-records'>
      <div className='daily-records-summary'>
        <div className='daily-records-date'>
          {formatTimeStamp(timeStamp, DateFormat.MONTH_DAYOFWEEK)}
        </div>
        {summary.totalExpense > 0 && summary.totalIncome > 0 && (
          <div className='daily-records-detail'>
            합계: {summary.totalIncome - summary.totalExpense}
          </div>
        )}
        {summary.totalExpense > 0 && (
          <div className='daily-records-detail'>
            지출: -{summary.totalExpense}
          </div>
        )}
        {summary.totalIncome > 0 && (
          <div className='daily-records-detail'>
            수입: +{summary.totalIncome}
          </div>
        )}
      </div>
      <div className='records'>
        {records &&
          records.map((data, index) => (
            <Record
              key={index}
              {...data}
              onOpenUpdateModal={onOpenUpdateModal}
              onDeleteRecord={onDeleteRecord}
            />
          ))}
      </div>
    </div>
  );
};

export default DailyRecords;
