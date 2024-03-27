import locationSVG from "/assets/location.svg"
import cellSVG from "/assets/cell.svg"
import birthdateSVG from "/assets/birthdate.svg"
import Loader from "@/components/Loader"
import Error from "@/pages/Error"
import { fDate } from "@/utils/formatTime"
import { useGetUser } from '@/hooks/useUsers';
import Wave from '@/components/WaveBackground';
import UserCard from "@/components/UserCard"


export default function UsersIndex() {
  const { user, loading, error } = useGetUser()

  const content = (() => {
    if (loading) return (
      <Loader className="m-auto mt-10" />
    )

    if (error || !user) return (
      <Error />
    )

    return (
      <div className="users-card-container mt-[100px] !cursor-default !flex">

        <img className="main-image hidden md:block w-[50%] max-h-[200px] object-contain border-r-8" alt={user.name.first} src={user.picture.large} />

        <div className="w-full md:w-[50%]">
          <UserCard user={user} disabled />
        </div>
      </div>
    )
  })()

  return (
    <div className="relative">
      <Wave classname="!bg-[#e0e7f1] absolute" />

      <section className="dashboard-users-index z-50 absolute w-full">

        <h1 className='header'>{user?.login.username ?? ""}</h1>
        {content}
      </section>
    </div>
  )
}