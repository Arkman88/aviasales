import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ticket from '../ticket/ticket';
import TicketTabs from '../ticket-tabs/ticket-tabs';
import { setTickets } from '../../store/slices/ticketsSlice';
import { useGetSearchIdQuery, useLazyGetTicketsQuery } from '../../utils/ticketsApi';
import { filterTicketsByStops } from '../../utils/stopsFilter';

import styles from './tickets-list.module.scss';

const TicketsList = () => {
  const dispatch = useDispatch();
  const { data: searchData, error: searchError } = useGetSearchIdQuery();
  const [trigger, { data: ticketsData, error: ticketsError }] = useLazyGetTicketsQuery();

  const checkedList = useSelector((state) => state.filters.checkedList);
  const allTickets = useSelector((state) => state.tickets.tickets);

  useEffect(() => {
    if (searchData && searchData.searchId) {
      trigger(searchData.searchId);
    }
  }, [searchData, trigger]);

  useEffect(() => {
    if (ticketsData && ticketsData.tickets) {
      dispatch(setTickets(ticketsData.tickets));
    }
  }, [ticketsData, dispatch]);

  if (searchError || ticketsError) {
    return <p>Ошибка загрузки данных</p>;
  }

  const filteredTickets = filterTicketsByStops(allTickets, checkedList);
  const slicedTickets = filteredTickets.slice(0, 5);

  return (
    <div className={styles.TicketsList}>
      <TicketTabs />
      {slicedTickets.length > 0 ? (
        slicedTickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)
      ) : (
        <p>Билеты не найдены</p>
      )}
      <button className={styles.loadMoreButton}>Показать еще 5 билетов!</button>
    </div>
  );
};

export default TicketsList;
