import TicketsList from '../components/tickets-list';
import TransfersFilter from '../components/transfers-filter/transfers-filter';
import logo from '../images/Logo.svg';
import styles from './app.module.scss';

const App = () => {
  return (
    <>
      <img className={styles.logo} src={logo} />
      <div className={styles.app}>
        <TransfersFilter />
        <TicketsList />
      </div>
    </>
  );
};

export default App;
