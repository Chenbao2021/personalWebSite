import { createSlice } from "@reduxjs/toolkit";

export const barSlice = createSlice({
    name: 'bottomBar',
    initialState: {
        selectedBar: 0
    },
    reducers: {
        changeSelectedBar: (state, action) => {
            state.selectedBar = action.payload;
        }
    }
})

export const {changeSelectedBar} = barSlice.actions

export default barSlice.reducer