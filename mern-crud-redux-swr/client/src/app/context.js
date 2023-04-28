import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: "",
  name: "",
  email: "",
  role: "",
  id: "",
}

export const contextSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setContext: (state, { payload }) => {
      state.token = payload.token
      state.email = payload.email
      state.name = payload.name
      state.role = payload.role
      state.id = payload._id
    },
    reset: (state) => {
      state.token = ""
      state.name = ""
      state.email = ""
      state.role = ""
      state.id = " "
    },
  },
})

export const { setContext, reset } = contextSlice.actions

export default contextSlice.reducer
