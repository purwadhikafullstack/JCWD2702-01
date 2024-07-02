import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchParams: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (prevState, action) => {
      prevState.searchParams = action.payload.searchParams;
    },
  },
});

export const { setSearchParams } = searchSlice.actions;

export default searchSlice.reducer;
