import { getAllUser, getUserById } from '@/services/usersAdmin'
import { IUsers } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

export const useAdminUsersQuery = (options?: Partial<IUsers>) => {
  const { data, ...rest } = useQuery({
    queryKey: ['USER_KEY', options],
    queryFn: async () => await getAllUser(options)
  })
  return { data, ...rest }
}
export const useAdminUser = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['USER_KEY', id],
    queryFn: async () => await getUserById(id)
  })

  return { data, ...rest }
}
