import { configureStore } from '@reduxjs/toolkit';
import sortReducer from './slices/sortSlice';
import filterReducer from './slices/filterSlice';
import ticketsReducer from './slices/ticketsSlice';
import { ticketsApi } from '../utils/ticketsApi';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    sort: sortReducer,
    filters: filterReducer,
    tickets: ticketsReducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ticketsApi.middleware, logger),
});

export default store;
