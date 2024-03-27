import locationSVG from "/assets/location.svg"
import cellSVG from "/assets/cell.svg"
import birthdateSVG from "/assets/birthdate.svg"
import Loader from "@/components/Loader"
import Error from "@/pages/Error"
import { fDate } from "@/utils/formatTime"
import { useGetUser } from '@/hooks/useUsers';
import Wave from '@/components/WaveBackground';


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
          <div className="card m-auto">
            <div className="header">
              <img alt={user.name.first} src={user.picture?.thumbnail} className="block md:hidden" />
              <div className="w-full">
                <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
                <p>{`${user.nat} | ${user.cell}`}</p>
              </div>
            </div>
            <div className="content">
              <div className="mb-8">
                <img src={locationSVG} alt="location_logo" />
                {`${user.location.street.name} ${user.location.street.number} | ${user.location.city} ${user.location.state}`}
              </div>

              <div>
                <p className="p1">
                  Phone:
                </p>
                <p className="p2">
                  <img src={cellSVG} alt="cell_logo" />
                  {user.cell}
                </p>
              </div>

              <div>
                <p className="p1">
                  Birthdate:
                </p>
                <p className="p2">
                  <img src={birthdateSVG} alt="birthdate_logo" />
                  {`${fDate(user.dob.date)} (Age: ${user.dob.age})`}
                </p>
              </div>
            </div>
          </div>
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