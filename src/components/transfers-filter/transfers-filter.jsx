import { Checkbox, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckedList, setCheckAll } from '../../store/slices/filterSlice';

import styles from './transfers-filter.module.scss';

const TransfersFilter = () => {
  const options = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

  const dispatch = useDispatch();
  const { checkedList, checkAll } = useSelector((state) => state.filters);

  const onChange = (checkedValues) => {
    dispatch(setCheckedList(checkedValues));
    dispatch(setCheckAll(checkedValues.length === options.length));
  };

  const onCheckAllChange = (e) => {
    dispatch(setCheckedList(e.target.checked ? options : []));
    dispatch(setCheckAll(e.target.checked));
  };

  const menuItems = [
    {
      key: 'g',
      label: 'Количество пересадок',
      type: 'group',
      children: [
        {
          key: '1',
          label: (
            <Checkbox onChange={onCheckAllChange} checked={checkAll}>
              Все
            </Checkbox>
          ),
        },
        {
          key: '2',
          label: (
            <div className={styles.checkboxGroup}>
              {options.map((option) => (
                <Checkbox
                  key={option}
                  value={option}
                  checked={checkedList.includes(option)}
                  onChange={(e) =>
                    onChange(
                      e.target.checked ? [...checkedList, option] : checkedList.filter((item) => item !== option)
                    )
                  }
                >
                  {option}
                </Checkbox>
              ))}
            </div>
          ),
        },
      ],
    },
  ];

  return <Menu className={styles.TransfersFilter} items={menuItems} />;
};

export default TransfersFilter;
