export const sortTickets = (tickets, sortBy) => {
  switch (sortBy) {
    case 'cheapest':
      return tickets.sort((a, b) => a.price - b.price);
    case 'fastest':
      return tickets.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
    case 'optimal':
      return tickets.sort(
        (a, b) =>
          a.price +
          a.segments[0].duration +
          a.segments[1].duration -
          (b.price + b.segments[0].duration + b.segments[1].duration)
      );
    default:
      return tickets;
  }
};
