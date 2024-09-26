import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedList: ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
  checkAll: true,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCheckedList: (state, action) => {
      state.checkedList = action.payload;
    },
    setCheckAll: (state, action) => {
      state.checkAll = action.payload;
    },
    resetFilters: (state) => {
      state.checkedList = [];
      state.checkAll = false;
    },
  },
});

export const { setCheckedList, setCheckAll, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
