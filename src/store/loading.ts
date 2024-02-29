import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState: {
        loadingState: false
    },
    reducers: {
        changeState: (state, action) => {
            const { payload } = action
            state.loadingState = payload
        }
    }
})

export const { changeState } = loadingSlice.actions