import { Card } from 'antd';
import styles from './ticket.module.scss';

const Ticket = ({ title, logo, infoRows }) => {
  return (
    <Card className={styles.Ticket} bordered={true}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <img src={logo} alt="Логотип авиакомпании" className={styles.logo} />
      </div>

      <div className={styles.body}>
        {infoRows.map((row, index) => (
          <div className={styles.row} key={index}>
            {row.map((info, i) => (
              <div className={styles.column} key={i}>
                {info}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Ticket;
