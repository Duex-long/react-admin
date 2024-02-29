import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./example";
import { loadingSlice } from "./loading";

const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        loading: loadingSlice.reducer
    }
})

export default store