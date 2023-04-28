import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import store from "./app/store"
import "./main.css"
import Login from "./routes/auth/login"
import Register from "./routes/auth/register"
import ErrorPage from "./routes/error"
import Root from "./routes/root"
import AddUser from "./routes/user/add-user"
import EditUser from "./routes/user/edit-user"
import ListUser from "./routes/user/list-user"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />}>
            <Route path='*' element={<ErrorPage />} />
            <Route index element={<ListUser />} />
            <Route path='add' element={<AddUser />} />
            <Route path='edit/:id' element={<EditUser />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
