import useAxios from 'axios-hooks';
import { UsersResponse, UsersListResponse } from '@/types/users';
import { useEffect, useState } from 'react';

export const useListUsers = () => {
  const [users, setUsers] = useState<UsersListResponse | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    Promise.all([...Array(10)].map(async () => {
      const data = await fetch("https://randomuser.me/api").then((res) => res.json()).then((data) => data)
      return data?.results[0]
    }))
    .then((res: UsersListResponse) => {
      setUsers(res);
    })
    .catch(() => {
      setError(true)
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return {
    users,
    loading,
    error,
  }
}

export const useGetUser = () => {
  const [res] = useAxios<UsersResponse>("https://randomuser.me/api");

  return {
    user: res.data?.results[0] ?? undefined,
    loading: res.loading,
    error: res.error,
  }
}