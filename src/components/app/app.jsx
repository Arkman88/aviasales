import TicketsList from '../tickets-list/tickets-list';
import TransfersFilter from '../transfers-filter/transfers-filter';
import logo from '../../images/Logo.svg';
import styles from './app.module.scss';
import s7_logo from '../../images/s7logo.svg';

const App = () => {
  const cardsData = [
    {
      title: '13 200 Р',
      logo: s7_logo,
      infoRows: [
        ['Москва', 'Нью-Йорк', 'Время вылета: 10:00'],
        ['Время прилета: 16:00', 'Время в пути: 10 ч', 'Цена: 250$'],
      ],
    },
    {
      title: '13 200 Р',
      logo: s7_logo,
      infoRows: [
        ['Париж', 'Токио', 'Время вылета: 12:00'],
        ['Время прилета: 08:00', 'Время в пути: 12 ч', 'Цена: 500$'],
      ],
    },
    {
      title: '13 200 Р',
      logo: s7_logo,
      infoRows: [
        ['Берлин', 'Лондон', 'Время вылета: 14:00'],
        ['Время прилета: 15:00', 'Время в пути: 1 ч', 'Цена: 100$'],
      ],
    },
  ];

  return (
    <>
      <img className={styles.logo} src={logo} />
      <div className={styles.app}>
        <TransfersFilter />
        <TicketsList cards={cardsData} />
      </div>
    </>
  );
};

export default App;
