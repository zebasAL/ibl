import Loader from "@/components/Loader"
import Error from "@/pages/Error"
import UserCard from "@/components/UserCard"
import { useListUsers } from '@/hooks/useUsers';

export default function UsersIndex() {
  const { users, loading, error } = useListUsers()

  const content = (() => {
    if (loading) return (
      <Loader className="m-auto mt-10" />
    )

    if (error) return (
      <Error />
    )

    return (
      <div className="users-card-container mt-[100px]">
        {users?.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    )
  })()

  return (
    <section className="dashboard-users-index">
      <h1 className='text-center header'>Users</h1>

      {content}
    </section>
  )
}