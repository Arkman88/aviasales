import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ticket from '../ticket/ticket';
import TicketTabs from '../ticket-tabs/ticket-tabs';
import { setTickets } from '../../store/slices/ticketsSlice';
import { useGetSearchIdQuery, useLazyGetTicketsQuery } from '../../utils/ticketsApi';
import { filterTicketsByStops } from '../../utils/stopsFilter';
import { sortTickets } from '../../utils/ticketsSort';

import styles from './tickets-list.module.scss';

const TicketsList = () => {
  const dispatch = useDispatch();
  const { data: searchData } = useGetSearchIdQuery();
  const [trigger, { isFetching: isTicketsLoading }] = useLazyGetTicketsQuery();

  const checkedList = useSelector((state) => state.filters.checkedList);
  const allTickets = useSelector((state) => state.tickets.tickets);
  const sortBy = useSelector((state) => state.tickets.sortBy);
  const [visibleTicketsCount, setVisibleTicketsCount] = useState(5);
  const [loadMessage, setLoadMessage] = useState('Идёт загрузка билетов с сервера');

  const fetchTickets = async (searchId) => {
    const response = await trigger(searchId);
    if (response.data) {
      dispatch(setTickets(response.data.tickets));
      setLoadMessage('Идёт загрузка билетов с сервера');

      if (response.data.stop) {
        setLoadMessage('Загрузка билетов завершена');
      } else {
        fetchTickets(searchId);
      }
    } else if (response.error) {
      if (response.error.status === 500) {
        fetchTickets(searchId);
      } else {
        setLoadMessage('Ошибка загрузки данных.');
      }
    }
  };

  useEffect(() => {
    if (searchData && searchData.searchId) {
      fetchTickets(searchData.searchId);
    }
  }, [searchData]);

  const filteredTickets = filterTicketsByStops(allTickets, checkedList);
  const sortedTickets = sortTickets(filteredTickets, sortBy);
  const visibleTickets = sortedTickets.slice(0, visibleTicketsCount);

  const handleLoadMoreTickets = () => {
    setVisibleTicketsCount((prevCount) => prevCount + 5);
  };

  return (
    <div className={styles.TicketsList}>
      <TicketTabs />
      <div className={styles['message-wrapper']}>
        <p className={styles.message}>{loadMessage}</p>
        <p className={styles.message}>Загружено: {allTickets.length}</p>
      </div>

      {visibleTickets.length > 0
        ? visibleTickets.map((ticket, index) => <Ticket key={index} ticket={ticket} />)
        : !isTicketsLoading && <p>Рейсов, подходящих под заданные фильтры, не найдено</p>}
      {visibleTicketsCount < sortedTickets.length && (
        <button className={styles.loadMoreButton} onClick={handleLoadMoreTickets}>
          Показать еще 5 билетов!
        </button>
      )}
    </div>
  );
};

export default TicketsList;
