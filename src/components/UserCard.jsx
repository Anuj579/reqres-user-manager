import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

function UserCard({ user, onDelete }) {
    const navigate = useNavigate()

    return (
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition max-w-md w-full">
            <Avatar className="w-14 h-14">
                <AvatarImage src={user.avatar} alt="User Avatar" />
                <AvatarFallback>
                    {user?.first_name[0]}
                </AvatarFallback>
            </Avatar>

            <div className="flex justify-start gap-2 sm:gap-4 w-full overflow-hidden">
                <div className="w-full ">
                    <h3 className="text-lg font-medium">
                        {user?.first_name} {user?.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground list-decimal break-words">{user.email}</p>
                </div>
                <div className="flex items-center gap-2 max-sm:hidden">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => navigate(`/edit-user/${user.id}`)}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => onDelete(user.id)}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className="sm:hidden" asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                    >
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="sm:hidden">
                    <DropdownMenuItem onClick={() => navigate(`/edit-user/${user.id}`)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive' onClick={() => onDelete(user.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <Toaster /> */}
        </div>
    )
}

export default UserCard