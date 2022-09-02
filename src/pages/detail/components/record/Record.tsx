import React, { FC } from 'react';
import { Icon, IconButton } from '../../../../components/Icon/Icon';
import { getIconByName } from '../../../../api/IconSelector';
import { Popconfirm } from 'antd';

import './Record.css';
export enum RecordType {
  Income = 'income',
  Expense = 'expense',
}

export interface RecordProps {
  id: number;
  timeStamp: number;
  type: RecordType;
  name: string;
  price: number;
  remark?: string;
}

interface RecordItem extends RecordProps {
  onOpenUpdateModal: (id: number) => void;
  onDeleteRecord: (id: number) => void;
}
const Record: FC<RecordItem> = ({
  id,
  type,
  name,
  price,
  remark,
  onOpenUpdateModal,
  onDeleteRecord,
}) => {
  const icon = getIconByName(type, name);
  return (
    <div className='record'>
      <Icon className='record-icon' icon={icon.icon} />
      <div className='record-name'>{name}</div>
      <div className='record-remark'>{remark}</div>
      <div className='record-price'>
        {type === RecordType.Income ? '+' : '-'}
        {price}
      </div>
      <div className='record-action'>
        <IconButton
          icon={'icon-bianji'}
          onClick={() => onOpenUpdateModal(id)}
        />
        <Popconfirm
          title='선택한 항목을 삭제하시겠습니까?'
          onConfirm={() => {
            onDeleteRecord(id);
          }}
          placement='rightTop'
        >
          <IconButton
            icon={'icon-shanchu'}
          />
        </Popconfirm>
      </div>
    </div>
  );
};

export default Record;
