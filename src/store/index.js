import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import ticketsReducer from './slices/ticketsSlice';
import { ticketsApi } from '../utils/ticketsApi';

const store = configureStore({
  reducer: {
    filters: filterReducer,
    tickets: ticketsReducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(ticketsApi.middleware),
});

export default store;
