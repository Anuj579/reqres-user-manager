import React, { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { AlertTriangle, LogOutIcon, Trash2Icon } from 'lucide-react'
import { Button } from './ui/button'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Navbar() {
  // const handleLogout = () => {
  //   try {
  //     const data = logout()
  //     if (data.success) {
  //       router.push('/auth/login')
  //     } else {
  //       toast.error(data.error)
  //     }
  //   } catch (error) {
  //     console.log("Logout failed:", error);
  //   }
  // }

  return (
    <header className="sticky bg-background top-0 z-10 w-full md:px-4 shadow">
      <div className="flex px-3 py-4 items-center max-w-4xl mx-auto">
        <div className="flex items-center">
          <Link to="/list">
            <span className="font-bold text-xl">Userly</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <nav className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar>
                    <AvatarImage src={"https://reqres.in/img/faces/8-image.jpg"} alt="User Avatar" />
                    <AvatarFallback className='text-base'>L</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Lindsay Ferguson</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      lindsay.ferguson@reqres.in
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

        </div>
      </div>
      <Toaster />
    </header >
  )
}

export default Navbar