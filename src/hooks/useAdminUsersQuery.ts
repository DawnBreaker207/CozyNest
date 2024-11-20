import { getAllUser, getUserById } from '@/services/usersAdmin'
import { useQuery } from '@tanstack/react-query'

export const useAdminUsersQuery = (options?: any) => {
  // {_limit: 2, _page: 1, id: 1}

  const { data, ...rest } = useQuery({
    queryKey: ['USER_KEY', options],
    queryFn: async () => {
      return options?._id ? await getUserById(options._id) : await getAllUser(options)
    }
  })
  const users = Array.isArray(data) ? data[0] : data

  return { data: users, ...rest }
}
