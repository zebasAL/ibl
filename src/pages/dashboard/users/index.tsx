import { useNavigate } from 'react-router';
import locationSVG from "/assets/location.svg"
import ageSVG from "/assets/age.svg"
import cellSVG from "/assets/cell.svg"
import birthdateSVG from "/assets/birthdate.svg"
import Loader from "@/components/Loader"
import Error from "@/pages/Error"
import { fDate } from "@/utils/formatTime"
import { useListUsers } from '@/hooks/useUsers';

export default function UsersIndex() {
  const { users, loading, error } = useListUsers()

  const navigate = useNavigate()

  const redirectUserDetail = (id: string) => {
    navigate(id)
  }

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
          <div className="card" onClick={() => redirectUserDetail(user.login.uuid)}>
            <div className="header">
              <img alt={user.name.first} src={user.picture?.thumbnail} />
              <div className="w-full text-left">
                <p>{`${user.name.title} ${user.name.first} ${user.name.last}`}</p>
                <p>{`${user.nat}`}</p>
              </div>
            </div>
            <div className="content">
              <div className="mb-8">
                <img src={locationSVG} alt="location_logo" />
                {user.location.city}
              </div>

              <div>
                <p className="p1">
                  Phone:
                </p>
                <p className="p2">
                  <img src={cellSVG} alt="cell_logo" />
                  {user.phone}
                </p>
              </div>

              <div>
                <p className="p1">
                  Age:
                </p>
                <p className="p2">
                  <img src={ageSVG} alt="age_logo" />
                  {user.dob.age}
                </p>
              </div>

              <div>
                <p className="p1">
                  Birthdate:
                </p>
                <p className="p2">
                  <img src={birthdateSVG} alt="birthdate_logo" />
                  {fDate(user.dob.date)}
                </p>
              </div>
            </div>
          </div>
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