import { configureStore } from "@reduxjs/toolkit"
import contextReducer from "./context"

export default configureStore({
  reducer: { context: contextReducer },
})
