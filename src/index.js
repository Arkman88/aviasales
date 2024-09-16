import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import fetchData from "./services/service";

// const fetchID = async () => {
//   const url = 'https://aviasales-test-api.kata.academy/search';
//   try {
//     const data = await fetchData(url);
//     const { searchId } = data;

//     return searchId;
//   }
//   catch (error) {
//     console.error(error)
//   }
// }

// const fetchTickets = async (url) => {
//   try {
//     const ID = await fetchID();
//     const ticket_url = `https://aviasales-test-api.kata.academy/tickets?searchId=${ID}`;
//     const data = await fetchData(ticket_url);
//     console.log(data);

//   }
//   catch (error) {
//     console.error(error)
//   }
// }
// fetchTickets();
