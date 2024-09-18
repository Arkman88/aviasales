import { Card, Row, Col } from 'antd';
import { format, addMinutes } from 'date-fns';
import styles from './ticket.module.scss';

const Ticket = ({ ticket }) => {
  const { price, carrier, segments } = ticket;
  const carrierLogo = `https://pics.avs.io/110/36/${carrier}.png`;

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  const formatStops = (stops) => {
    if (stops.length === 0) {
      return 'Без пересадок';
    } else if (stops.length === 1) {
      return (
        <>
          {stops.length} пересадка
          <br />
          <span className={styles.bold}>{stops.join(', ')}</span>
        </>
      );
    } else {
      return (
        <>
          {stops.length} пересадки
          <br />
          <span className={styles.bold}>{stops.join(', ')}</span>
        </>
      );
    }
  };

  return (
    <Card className={styles.Ticket} bordered={true}>
      <div className={styles.header}>
        <h3 className={styles.price}>{`${price} ₽`}</h3>
        <img src={carrierLogo} alt="Логотип авиакомпании" className={styles.logo} />
      </div>

      <div className={styles.body}>
        {segments.map((segment, index) => {
          const departureDate = new Date(segment.date);
          const arrivalDate = addMinutes(departureDate, segment.duration);

          return (
            <Row className={styles.segment} key={index}>
              <Col span={8} className={styles.column}>
                <div>{`${segment.origin} - ${segment.destination}`}</div>
                <div
                  className={styles.bold}
                >{`${format(departureDate, 'HH:mm')} - ${format(arrivalDate, 'HH:mm')}`}</div>
              </Col>
              <Col span={8} className={styles.column}>
                <div>В пути</div>
                <div className={styles.bold}>{formatDuration(segment.duration)}</div>
              </Col>
              <Col span={8} className={styles.column}>
                {formatStops(segment.stops)}
              </Col>
            </Row>
          );
        })}
      </div>
    </Card>
  );
};

export default Ticket;
