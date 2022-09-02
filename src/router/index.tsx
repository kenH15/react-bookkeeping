import DetailPage from '../pages/detail/DetailPage';
import ChartPage from '../pages/chart/ChartPage';
import { Navigate } from 'react-router-dom';
export const routes = [
  {
    path: '/detail',
    element: <DetailPage />,
  },
  {
    path: '/chart',
    element: <ChartPage />,
  },
  {
    path: '*',
    element: <Navigate to='/detail' />,
  },
];
