import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Layout from "./pages/Layout"
import ListPage from "./pages/ListPage"
import { useAuth } from "./contexts/AuthContext"
import EditUserPage from "./pages/EditUserPage"

function App() {
  const { user } = useAuth();

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/login" element={user ? <Navigate to='/list' /> : <LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Navigate to='/list' /> : <Navigate to='/login' />} />
        <Route path="list" element={user ? <ListPage /> : <Navigate to='/login' />} />
        <Route path="edit-user/:id" element={user ? <EditUserPage /> : <Navigate to='/login' />} />
      </Route>
    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App