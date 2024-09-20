export const filterTicketsByStops = (tickets, checkedList) => {
  if (checkedList.length === 0) return [];

  return tickets.filter((ticket) => {
    const firstSegmentStopsCount = ticket.segments[0].stops.length;
    const secondSegmentStopsCount = ticket.segments[1]?.stops.length || 0;

    const getStopsLabel = (stopsCount) =>
      stopsCount === 0 ? 'Без пересадок' : stopsCount === 1 ? '1 пересадка' : `${stopsCount} пересадки`;

    const firstSegmentLabel = getStopsLabel(firstSegmentStopsCount);
    const secondSegmentLabel = getStopsLabel(secondSegmentStopsCount);

    return checkedList.includes(firstSegmentLabel) || checkedList.includes(secondSegmentLabel);
  });
};
