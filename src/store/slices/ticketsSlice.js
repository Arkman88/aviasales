import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  sortBy: 'cheapest',
  stop: false,
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
    setStop(state, action) {
      state.stop = action.payload;
    },
  },
});

export const { setTickets, setSortBy, setStop } = ticketsSlice.actions;
export default ticketsSlice.reducer;
