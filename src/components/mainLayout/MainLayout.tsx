import React, { FC, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { Statistic } from 'antd';
import './MainLayout.css';
import { Icon } from '../Icon/Icon';
import Logo from '../Logo/Logo';
import { routes } from '../../router/index';
import { useNavigate, useRoutes, useLocation } from 'react-router-dom';
import { Moment } from 'moment';

import LocaleDatePicker from '../datePicker/datePicker';

import { useDispatch, useSelector } from 'react-redux';
import { getSummary } from '../../api/recordHelper';
import { RootState } from '../../reducers';
import { Action } from '../../actions/actionList';
import { State } from '../../reducers/operate ';
import { fetchRecordsAsync } from '../../reducers/asyncActions';

const { Sider, Content } = Layout;

const items: MenuProps['items'] = [
  {
    label: '세부사항',
    key: 'detail',
    icon: <Icon icon={'icon-zhuye'} />,
  },
  {
    label: '차트',
    key: 'chart',
    icon: <Icon icon={'icon-Chart'} />,
  },
];

interface Props {
  value: any;
}
const MainLayout: FC<Props> = ({ value }) => {
  const operate: State = useSelector((state: RootState) => state.operate);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecordsAsync(operate.month));
  }, [dispatch, operate.month]);

  const monthlySummary = getSummary(operate.monthlyRecords); //선택된 월의 입출금

  const onMonthChange = (month: Moment, dateString: string) => {
    dispatch({ type: Action.UPDATE_MONTH, month });
    //dispatch(updateMonthAction(month)); redux thunk
  };

  const navigate = useNavigate();
  const pathname = useLocation().pathname.substring(1);
  const handleClick: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
  };
  return (
    <Layout className='app'>
      <Sider className='sider' theme='light' collapsible>
        <Logo />
        <Menu
          defaultSelectedKeys={[pathname]}
          items={items}
          onClick={handleClick}
        />
      </Sider>
      <Content className='content'>
        <div className='header'>
          <Logo size={'large'} />
          <div className='header-container'>
            <Statistic
              title={'Month'}
              valueRender={() => (
                <LocaleDatePicker
                  onChange={onMonthChange}
                  value={operate.month}
                />
              )}
            />
            <Statistic
              className='moneyTable'
              title={'수입'}
              value={monthlySummary.totalIncome}
            />
            <Statistic
              className='moneyTable'
              title={'지출'}
              value={monthlySummary.totalExpense}
            />
            <Statistic
              className='moneyTable'
              title={'합계'}
              value={monthlySummary.totalIncome - monthlySummary.totalExpense}
            />
          </div>
        </div>
        <div className='body'>{useRoutes(routes)}</div>
      </Content>
    </Layout>
  );
};
export default MainLayout;
