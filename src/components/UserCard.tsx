import { useNavigate } from "react-router"
import { fDate } from "@/utils/formatTime"
import { User } from "@/types/users"
import locationSVG from "/assets/location.svg"
import ageSVG from "/assets/age.svg"
import cellSVG from "/assets/cell.svg"
import birthdateSVG from "/assets/birthdate.svg"

type UserCard = {
  disabled?: boolean,
  user: User,
}

export default function UserCard({ disabled = false, user }: UserCard) {
  const navigate = useNavigate()

  const redirectUserDetail = (id: string) => {
    if (disabled) return
    navigate(id)
  }

  return (
    <div className={`user-card ${disabled ? "!cursor-default" : ""}`} onClick={() => redirectUserDetail(user.login.uuid)}>
      <div className="header">
        <img alt={user.name.first} src={user.picture?.thumbnail} className={`${disabled ? "block md:hidden" : ""}`} />
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
  )
}