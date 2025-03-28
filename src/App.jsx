import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Layout from "./pages/Layout"
import ListPage from "./pages/ListPage"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/list" element={<ListPage />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App