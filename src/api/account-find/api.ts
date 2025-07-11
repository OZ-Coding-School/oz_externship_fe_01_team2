import fetcher from '../../lib/fetcher'
import type { ChangePassword } from './type'

const AccountFindApi = {
  changePassword: async (data: ChangePassword): Promise<void> => {
    const response = await fetcher.post('/auth/account/change-password', data)
    return response.data
  },
}

export default AccountFindApi
