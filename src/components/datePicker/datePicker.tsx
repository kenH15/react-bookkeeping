import React, { FC } from 'react';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import './datePicker.css';

interface datePickerProps {
  picker?: 'month' | 'date';
  value?: Moment;
  onChange?: (timeStamp: Moment, dateString: string) => void;
}
const LocaleDatePicker: FC<datePickerProps> = ({
  picker = 'month',
  value,
  onChange,
}) => {
  return (
    <DatePicker
      picker={picker}
      allowClear={false}
      inputReadOnly={true}
      disabledDate={(time) => time.isAfter(moment())}
      value={value}
      onChange={onChange as any}
    />
  );
};

export default LocaleDatePicker;
