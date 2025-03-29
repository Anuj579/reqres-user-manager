import { useEffect, useState } from "react"
import UserCard from "../components/UserCard"
import axios from "axios";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { Button } from "../components/ui/button";
import toast, { Toaster } from "react-hot-toast";

function ListPage() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
                setUsers(res.data.data);
                setTotalPages(res.data.total_pages);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, [currentPage]);

    const handleDeleteClick = (id) => {
        setDeletingUserId(id);
        setDeletingAccount(true);
    };

    const deleteUser = async (userId) => {
        setDisabled(true);
        try {
            await axios.delete(`https://reqres.in/api/users/${userId}`);
            console.log(`User ${userId} deleted successfully`);
            toast.success("User deleted successfully")
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            toast.error("Failed to delete user")
            console.error("Error deleting user:", error);
        } finally {
            setDisabled(false)
            setDeletingAccount(false);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-[90vh] container px-4 mx-auto'>
            {loading ? <LoaderCircle className='animate-spin w-10 h-10' /> : (
                <div className="my-14 flex flex-col items-center gap-4 w-full ">
                    {users.map(user => (
                        <UserCard key={user.id} user={user} onDelete={handleDeleteClick} />
                    ))}
                    <Pagination className='mt-4'>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        isActive={currentPage === index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
            <AlertDialog open={deletingAccount} onOpenChange={setDeletingAccount}>
                <AlertDialogContent className="sm:max-w-md animate-in fade-in-90 zoom-in-90 duration-200">
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-semibold flex items-center text-red-600 dark:text-red-500'>
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Confirm Deletion
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this account?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
                        <Button
                            variant="destructive"
                            onClick={() => deleteUser(deletingUserId)}
                            disabled={disabled}
                        >
                            {disabled && <LoaderCircle className='animate-spin h-5 w-5 mr-1' />}
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Toaster />
        </div>
    )
}

export default ListPage