import React, { FC } from 'react';
import { Card } from 'antd';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DailySummary } from '../../../../api/recordHelper';

interface LineChartProps {
  month:number
  title: string;
  data: DailySummary[];
}
const LineChartInMonth: FC<LineChartProps> = ({ month,title, data }) => {
  return (
    <Card title={`${month +'월 '+ title}:`}>
      <ResponsiveContainer height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3'/>
            <XAxis dataKey='date' />
            <YAxis />
            <Line dataKey='totalIncome' name={'수입'} stroke={'#8884d8'} />
            <Line dataKey='totalExpense' name={'지출'} stroke={'#8dd1e1'} />
            <Tooltip labelFormatter={(label) => <span>{month}월{label}일</span>} />
            <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default LineChartInMonth;
