import { configureStore } from '@reduxjs/toolkit'
import barReducer from './barSlice';


export default configureStore({
  reducer: {
    bar: barReducer
  }
})