import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"

function UserCard() {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition max-w-md w-full">
            <Avatar className="w-14 h-14">
                <AvatarImage src={"https://reqres.in/img/faces/1-image.jpg"} alt="User Avatar" />
                <AvatarFallback>
                    G
                </AvatarFallback>
            </Avatar>

            <div className="flex justify-start gap-2 sm:gap-4 w-full overflow-hidden">
                <div className="w-full ">
                    <h3 className="text-lg font-medium">
                        George Bluth
                    </h3>
                    <p className="text-sm text-muted-foreground list-decimal break-words">lindsay.ferguson@reqres.in</p>
                </div>
                <div className="flex items-center gap-2 max-sm:hidden">
                    <Button
                        size="icon"
                        variant="outline"
                    // onClick={onEdit}
                    >
                        <Pencil className="w-4 h-4" />
                    </Button>

                    <Button
                        size="icon"
                        variant="destructive"
                    // onClick={onDelete}
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
                    <DropdownMenuItem >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive'>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserCard