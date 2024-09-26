import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../store/slices/ticketsSlice';
import styles from './ticket-tabs.module.scss';

const TicketTabs = () => {
  const dispatch = useDispatch();

  const handleChange = (key) => {
    if (key === '1') dispatch(setSortBy('cheapest'));
    if (key === '2') dispatch(setSortBy('fastest'));
    if (key === '3') dispatch(setSortBy('optimal'));
  };

  const items = [
    { label: 'Самый дешёвый', key: '1' },
    { label: 'Самый быстрый', key: '2' },
    { label: 'Оптимальный', key: '3' },
  ];

  return <Tabs defaultActiveKey="1" centered className={styles.customTabs} items={items} onChange={handleChange} />;
};

export default TicketTabs;
