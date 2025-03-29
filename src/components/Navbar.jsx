import { LogOutIcon } from 'lucide-react'
import { Button } from './ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  }

  return (
    <header className="sticky bg-background top-0 z-10 w-full md:px-4 shadow">
      <nav className="flex px-3 py-4 items-center max-w-4xl mx-auto">
        <div className="flex items-center">
          <Link to="/list">
            <span className="font-bold text-xl">Userly</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button variant="outline" onClick={() => handleLogout()}>
            <LogOutIcon className="mr-2 h-4 w-4 text-destructive" />
            <span>Log out</span>
          </Button>
        </div>
      </nav>
      <Toaster />
    </header >
  )
}

export default Navbar