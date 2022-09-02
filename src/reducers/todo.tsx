import { Moment } from 'moment';
import {
  RecordProps,
  RecordType,
} from '../pages/detail/components/record/Record';

//***************modal창 잡업의 reducer************* */
enum ActionEnum {
  PRICE_CHANGE = 'PRICE_CHANGE',
  MONTH_CHANGE = 'MONTH_CHANGE',
  REMARK_CHANGE = 'REMARK_CHANGE',
  TYPE_CHANGE = 'TYPE_CHANGE',
}

interface ActionType {
  type: ActionEnum;
  month: Moment;
  price: number | undefined;
  remark?: string;
  recordType: RecordType;
  name: string;
}

export interface Values extends Omit<RecordProps, 'id' | 'timeStamp'> {
  month: Moment;
}

const todo = (initialVal: Values, action: ActionType) => {
  switch (action.type) {
    case 'PRICE_CHANGE':
      return { ...initialVal, price: action.price };
    case 'MONTH_CHANGE':
      return { ...initialVal, month: action.month };
    case 'REMARK_CHANGE':
      return { ...initialVal, remark: action.remark };
    case 'TYPE_CHANGE':
      return { ...initialVal, name: action.name, type: action.recordType };
    default:
      return initialVal || {};
  }
};
export default todo;
