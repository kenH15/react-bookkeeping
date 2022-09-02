import React, { FC, useState } from 'react';
import DailyRecords from './components/dailyRecords/DailyRecords';
import { groupDailyRecords } from '../../api/recordHelper';
import { IconButton } from '../../components/Icon/Icon';
import './DetailPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import DetailModal, {
  NewRecordItem,
} from './components/detailModal/DetailModal';
import { RecordProps } from './components/record/Record';
import { State } from '../../reducers/operate ';
import {
  createNewRecordAsync,
  deleteRecordAsync,
  updateRecordAsync,
} from '../../reducers/asyncActions';
const DetailPage: FC = () => {
  //편집할 record id 바꾸는 setter   updateRecordId:편집중인 recordID반환
  const [updateRecordId, setUpdateRecordId] = useState<number>();


  //selector reducer 从全局获取records
  const operate: State = useSelector((state: RootState) => state.operate);
  const groupedDailyRecords = groupDailyRecords(operate.monthlyRecords);

  //setvisible modal
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  //편집할 record 이미 있던data가져오기
  const target = updateRecordId
    ? operate.monthlyRecords.find((i) => i.id === updateRecordId)
    : undefined;

  //편집 or 생성
  //********************새로운 RECORD 추가 함수**********************/
  const onAddRecord = (record: NewRecordItem) => {
    //비동기
    dispatch(createNewRecordAsync(record));
  };

  //****************************편집 확인 누를떄**************************//
  const onUpdateRecord = (record: RecordProps) => {
    if (updateRecordId) {
      dispatch(updateRecordAsync(record, updateRecordId));
    }
  };

  //*************************RECORD편집 버튼 누를떄***************************//
  const onOpenUpdateModal = (id: number) => {
    setUpdateRecordId(id);
    setVisible(true);
  };

  //***************************삭제 버튼 누를떄 *********************************/
  const onDeleteRecord = (id: number) => {
    dispatch(deleteRecordAsync(id));
  };

  return (
    <div className='detail-page'>
      <div className='detail-page-header'>
        <IconButton
          icon='icon-huabanfuben'
          className='detail-page-add-btn'
          onClick={() => {
            setVisible(!visible);
            setUpdateRecordId(undefined);
          }}
        />
      </div>
      <div className='detail-page-content'>
        {groupedDailyRecords.map((data) => (
          <DailyRecords
            key={data.timeStamp}
            {...data}
            onOpenUpdateModal={onOpenUpdateModal}
            onDeleteRecord={onDeleteRecord}
          />
        ))}
      </div>
      <DetailModal
        visible={visible}
        onClose={() => {
          setVisible(!visible);
        }}
        operateRecord={target ? onUpdateRecord : onAddRecord}
        updateRecord={target}
      />
    </div>
  );
};

export default DetailPage;
