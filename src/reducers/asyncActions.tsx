import { Moment } from 'moment';
import { Action } from '../actions/actionList';
import {
  createNewRecord,
  deleteRecord,
  getRecordsBetweenRange,
  updateRecord,
} from '../api/client';
import { getMonthRange } from '../api/dateHelper';
import { NewRecordItem } from '../pages/detail/components/detailModal/DetailModal';
import { RecordProps } from '../pages/detail/components/record/Record';

export const fetchRecordsAsync =
  (month: Moment): any =>
  async (dispatch: any) => {
    const [start, end] = getMonthRange(month);
    const recordList = await getRecordsBetweenRange(start, end);
    dispatch({ type: Action.UPDATE_MONTHLY_RECORDS, records: recordList });
  };

export const createNewRecordAsync =
  (record: NewRecordItem): any =>
  async (dispatch: any) => {
    const newRecord = await createNewRecord(record);
    dispatch({ type: Action.ADD_RECORD, record: newRecord });
  };

export const updateRecordAsync =
  (record: RecordProps, id: number): any =>
  async (dispatch: any) => {
    const updated = await updateRecord(record, id);
    dispatch({ type: Action.UPDATE_RECORD, record: updated });
  };

export const deleteRecordAsync =
  (recordId: number): any =>
  async (dispatch: any) => {
    await deleteRecord(recordId);
    dispatch({ type: Action.DELETE_RECORD, record: { id: recordId } });
  };
