import fetcher from '../../lib/fetcher'
import type { UserWithdrawal } from './types'

const UserWithdrawalApi = {
  withdraw: async (data: Partial<UserWithdrawal>): Promise<UserWithdrawal> => {
    const response = await fetcher.delete('/auth/users/delete', { data })
    return response.data
  },
}

export default UserWithdrawalApi
