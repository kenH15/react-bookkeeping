import axios from 'axios';
import { NewRecordItem } from '../pages/detail/components/detailModal/DetailModal';
import { RecordProps } from '../pages/detail/components/record/Record';

axios.interceptors.response.use((response) => response.data);

//월 구간내의 record get로 가져오기
export const getRecordsBetweenRange = (start: number, end: number) => {
  return axios.get<any, RecordProps[]>(
    `http://localhost:8000/records?timeStamp_gte=${start}&timeStamp_lte=${end}`
  );
};

//record 생성
export const createNewRecord = (record: NewRecordItem) => {
  return axios.post<any, RecordProps>('http://localhost:8000/records', record);
};

//record편집
export const updateRecord = (record: RecordProps, id: number) => {
  return axios.put<any, RecordProps>(
    `http://localhost:8000/records/${id}`,
    record
  );
};

//record삭제
export const deleteRecord = (recordId: number) => {
  return axios.delete<any, RecordProps>(
    `http://localhost:8000/records/${recordId}`
  );
};
