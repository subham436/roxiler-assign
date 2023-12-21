import { configureStore, createSlice } from '@reduxjs/toolkit';

const monthSlice = createSlice({
  name: 'month',
  initialState: 3, 
  reducers: {
    setMonth: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setMonth } = monthSlice.actions;

const store = configureStore({
  reducer: {
    month: monthSlice.reducer,
  },
});

export default store;
