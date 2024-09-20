import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Ticket from '../ticket/ticket';
import TicketTabs from '../ticket-tabs/ticket-tabs';
import { setTickets, setStop } from '../../store/slices/ticketsSlice';
import { useGetSearchIdQuery, useLazyGetTicketsQuery } from '../../utils/ticketsApi';
import { filterTicketsByStops } from '../../utils/stopsFilter';
import { sortTickets } from '../../utils/ticketsSort';

import styles from './tickets-list.module.scss';

const TicketsList = () => {
  const dispatch = useDispatch();
  const { data: searchData, error: searchError } = useGetSearchIdQuery();
  const [trigger, { data: ticketsData, error: ticketsError, isFetching: isTicketsLoading }] = useLazyGetTicketsQuery();

  const stop = useSelector((state) => state.tickets.stop);
  const checkedList = useSelector((state) => state.filters.checkedList);
  const allTickets = useSelector((state) => state.tickets.tickets);
  const sortBy = useSelector((state) => state.tickets.sortBy);
  const [visibleTicketsCount, setVisibleTicketsCount] = useState(5);
  const [loadMessage, setLoadMessage] = useState('Идёт загрузка билетов с сервера');

  useEffect(() => {
    if (searchData && searchData.searchId && !stop) {
      const intervalId = setInterval(() => {
        trigger(searchData.searchId);
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [searchData, trigger, stop]);

  useEffect(() => {
    if (ticketsData && ticketsData.tickets) {
      dispatch(setTickets(ticketsData.tickets));
      setLoadMessage('Идёт загрузка билетов с сервера');

      if (ticketsData.stop) {
        dispatch(setStop(true));
        setLoadMessage('Загрузка билетов завершена');
      }
    } else if (ticketsError && ticketsError.status === 500) {
      const timeoutId = setTimeout(() => {
        trigger(searchData.searchId);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [ticketsData, ticketsError, dispatch, searchData, trigger, searchError]);

  useEffect(() => {
    if (ticketsError || searchError) {
      const errorMessage =
        ticketsError?.status === 500
          ? 'Сервер не отвечает. Повторный запрос через 2 секунды.'
          : 'Ошибка загрузки данных.';
      setLoadMessage(errorMessage);
    }
  }, [ticketsError, searchError]);

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
