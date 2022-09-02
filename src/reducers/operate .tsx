import moment, { Moment } from 'moment';
import { RecordProps } from '../pages/detail/components/record/Record';
import { Action } from '../actions/actionList';
import { isSameMonth } from '../api/dateHelper';

//reducer 전역 state
export interface State {
  month: Moment;
  monthlyRecords: RecordProps[];
}

export const defaultState: State = {
  month: moment(),
  monthlyRecords: [],
};

export interface ActionType {
  type: Action;
  month: Moment;
  record: RecordProps;
  id: number;
  records: RecordProps[];
}
//reducer
const operate = (state = defaultState, action: ActionType) => {
  switch (action.type) {
    case Action.UPDATE_MONTH:
      return { ...state, month: action.month };
    case Action.ADD_RECORD:
      return {
        ...state,
        monthlyRecords: isSameMonth(action.record.timeStamp, state.month)
          ? state.monthlyRecords.concat(action.record)
          : state.monthlyRecords,
      };
    case Action.DELETE_RECORD: //삭제
      return {
        ...state,
        monthlyRecords: state.monthlyRecords.filter(
          (item) => item.id !== action.record.id
        ),
      };
    case Action.UPDATE_RECORD: //항목 편집
      return {
        ...state,
        monthlyRecords: isSameMonth(action.record.timeStamp, state.month)
          ? state.monthlyRecords.map((i) =>
              i.id === action.record.id ? action.record : i
            )
          : state.monthlyRecords.filter((i) => i.id !== action.record.id),
      };
    case Action.UPDATE_MONTHLY_RECORDS:
      return { ...state, monthlyRecords: action.records };
    default:
      return state;
  }
};
export default operate;
