import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  sortBy: 'cheapest',
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action) => {
      state.tickets = [...state.tickets, ...action.payload];
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setTickets, setSortBy } = ticketsSlice.actions;
export default ticketsSlice.reducer;
