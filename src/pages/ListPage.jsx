import Navbar from "../components/Navbar"
import UserCard from "../components/UserCard"

function ListPage() {
    return (
        <>
            <Navbar />
            <div className='flex flex-col gap-4 justify-center items-center h-[90vh] container px-4 mx-auto'>
                <UserCard />
                <UserCard />
                <UserCard />
            </div>
        </>
    )
}

export default ListPage