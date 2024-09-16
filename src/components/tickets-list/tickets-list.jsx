import Ticket from '../ticket/ticket';
import styles from './tickets-list.module.scss';
import TicketTabs from '../ticket-tabs/ticket-tabs';

const TicketsList = ({ cards }) => {
  return (
    <div className={styles.TicketsList}>
      <TicketTabs />
      {cards.map((card, index) => (
        <Ticket key={index} title={card.title} logo={card.logo} infoRows={card.infoRows} />
      ))}
      <button className={styles.loadMoreButton}>Показать еще 5 билетов!</button>
    </div>
  );
};

export default TicketsList;
