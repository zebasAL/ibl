
type User = {
  cell: string,
  phone: string,
  nat: string,
  picture: {
    thumbnail: string,
    large: string,
    medium: string,
  },
  name: {
    first: string,
    last: string,
    title: string,
  },
  dob: {
    age: number,
    date: string,
  },
  location: {
    city: string,
    country: string,
    postcode: number,
    state: string,
    street: {
      name: string,
      number: number,
    },
  },
  login: {
    username: string,
    uuid: string,
  }
}

export type UsersListResponse = User[]

export type UsersResponse = {
  info: {
    page: number,
    results: number,
    seed: string,
    version: string,
  },
  results: User[],
}