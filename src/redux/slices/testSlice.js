import { createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
    name: 'testSlice',
    initialState: {},
    reducers: {
        test(state = {}, action) {
            return state;
        }
    }
});

export const { test } = testSlice.actions;
export const testReducer = testSlice.reducer;