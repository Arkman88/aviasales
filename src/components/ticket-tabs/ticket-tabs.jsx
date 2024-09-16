import { Tabs } from 'antd';
import styles from './ticket-tabs.module.scss';

const Cheapest = () => <div>Самый дешёвый</div>;
const Fastest = () => <div>Самый быстрый</div>;
const Optimal = () => <div>Самый оптимальный</div>;

const TicketTabs = () => {
  const items = [
    {
      label: 'Самый дешевый',
      key: '1',
      children: <Cheapest />,
    },
    {
      label: 'Самый быстрый',
      key: '2',
      children: <Fastest />,
    },
    {
      label: 'Оптимальный',
      key: '3',
      children: <Optimal />,
    },
  ];

  return <Tabs defaultActiveKey="1" centered className={styles.customTabs} items={items} />;
};

export default TicketTabs;
