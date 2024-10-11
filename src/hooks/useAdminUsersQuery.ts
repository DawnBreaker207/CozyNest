import { getAllUser, getUserById } from '@/services/usersAdmin'
import { useQuery } from '@tanstack/react-query'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAdminUsersQuery = (options?: any) => {
  // {_limit: 2, _page: 1, id: 1}
  const { data, ...rest } = useQuery({
    queryKey: ['USER_KEY', options],
    queryFn: async () => {
      return options?.id ? await getUserById(options.id as number | string) : await getAllUser(options)
    }
  })

  return { data, ...rest }
}
