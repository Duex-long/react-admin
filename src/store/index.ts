import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./example";
import { loadingSlice } from "./loading";
import { globalSlice } from './global'

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    loading: loadingSlice.reducer,
    global: globalSlice.reducer,
  },
})

export default store