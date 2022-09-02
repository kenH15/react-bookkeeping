import React, { FC, useEffect } from 'react';
import { Modal, Tabs, Input, message } from 'antd';
import LocaleDatePicker from '../../../../components/datePicker/datePicker';
import { EXPENDITURE_ICON_LIST, INCOME_ICON_LIST } from '../../../../constants';
import { IconButton } from '../../../../components/Icon/Icon';
import { RecordProps, RecordType } from '../record/Record';
import './DetailModal.css';
import moment, { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../reducers';
import { Values } from '../../../../reducers/todo';
import classNames from 'classnames';
const { TabPane } = Tabs;

//record새로 만들떄 id 필요없음므로 id 속성 뺸 타입
export type NewRecordItem = Omit<RecordProps, 'id'>;

interface DetailModalProps {
  visible: boolean;
  onClose: () => void;
  operateRecord:
    | ((record: NewRecordItem) => void)
    | ((record: RecordProps) => void); //새로생성 혹은 편집
  updateRecord?: RecordProps; //편집떄 updateRecord 새로 생성떄 undefined
}

//visible:modal창                          onClose:창 닫을떄 함수
//updateRecord:편집상태 target 데이터 가져오기;새로생성떄 undefined     operateRecord:편집 or 생성

const DetailModal: FC<DetailModalProps> = ({
  visible,
  onClose,
  updateRecord,
  operateRecord,
}) => {
  const dispatch = useDispatch();

  //날짜 금액 메모 값
  const todo: Values = useSelector((state: RootState) => state.todo);

  //tabs항목 변화 action
  function onTypeChange(type?: RecordType, name?: string) {
    dispatch({
      type: 'TYPE_CHANGE',
      recordType: type,
      name: name,
    });
  }
  //달 변화
  function onMonthChange(month: Moment) {
    dispatch({
      type: 'MONTH_CHANGE',
      month: month,
    });
  }
  //금액 변화
  function onPriceChange(price: number | undefined) {
    dispatch({
      type: 'PRICE_CHANGE',
      price: price,
    });
  }
  //메모 변화
  function onRemarkChange(remark: string | undefined) {
    dispatch({
      type: 'REMARK_CHANGE',
      remark: remark,
    });
  }

  //데이터 처리  편집/생성
  function normalizeValues({
    month,
    price,
    ...props
  }: Values): NewRecordItem | RecordProps {
    const timeStamp = month.valueOf();
    const normalizedPrice = Math.abs(todo.price);
    return { ...props, timeStamp, price: normalizedPrice };
  }

  //****************************편집 modal열릴떄 데이터 초기화*************************************//
  useEffect(() => {
    if (visible) {
      //편집떄
      if (updateRecord) {
        onTypeChange(updateRecord.type, updateRecord.name);
        onMonthChange(moment(updateRecord.timeStamp));
        onPriceChange(updateRecord.price);
        onRemarkChange(updateRecord.remark);
      } else {
        //데이터 초기화
        onMonthChange(moment());
        onPriceChange(undefined);
        onRemarkChange('');
        onTypeChange(RecordType.Expense, '');
      }
    }
  }, [visible]);

  //********************click 할떄 submit*****************************/
  function onSubmit() {
    //console.log(todo);
    if (!todo.name) {
      message.error('항목을 선택해주세요');
      return;
    }
    if (!todo.month) {
      message.error('날짜을 선택해주세요');
      return;
    }
    if (!todo.price) {
      message.error('금액을 입력해주세요');
      return;
    }
    message.success('완성');
    operateRecord(normalizeValues(todo) as RecordProps);
    //onAddRecord(getNewRecordItem(todo));
    onClose();
  }
  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      onCancel={onClose}
      onOk={onSubmit}
    >
      <div className='detail-modal'>
        <Tabs
          activeKey={todo.type}
          centered
          size={'middle'}
          onChange={(activeKey) => {
            onTypeChange(activeKey as RecordType, undefined);
          }}
        >
          <TabPane tab='지출' key={RecordType.Expense}>
            <div className='record-item-container'>
              {EXPENDITURE_ICON_LIST.map((item) => (
                <div key={item.name} className='record-item'>
                  <IconButton
                    icon={item.icon}
                    onClick={() => {
                      onTypeChange(RecordType.Expense, item.name);
                    }}
                    className={classNames({ active: todo.name === item.name })}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </TabPane>
          <TabPane tab='수입' key={RecordType.Income}>
            <div className='record-item-container'>
              {INCOME_ICON_LIST.map((item) => (
                <div key={item.name} className='record-item'>
                  <IconButton
                    icon={item.icon}
                    onClick={() => {
                      onTypeChange(RecordType.Income, item.name);
                    }}
                    className={classNames({ active: todo.name === item.name })}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </TabPane>
        </Tabs>
        <div className='input-list'>
          <div className='list-item'>
            <span>날짜: </span>{' '}
            <LocaleDatePicker
              value={todo.month}
              picker={'date'}
              onChange={onMonthChange}
            />
          </div>
          <div className='list-item'>
            <span>금액: </span>
            <Input
              type='number'
              value={todo.price}
              onChange={(e) => {
                onPriceChange(parseInt(e.target.value));
              }}
            />
          </div>
          <div className='list-item'>
            <span>메모:</span>{' '}
            <Input
              value={todo.remark}
              type='text'
              maxLength={20}
              onChange={(e) => {
                onRemarkChange(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
