import { ErrorCode } from '../types/errorCodes'

export const ERROR_MESSAGES = {
  [ErrorCode.NOT_FOUND]: {
    title: '404',
    message: '페이지를 찾을 수 없습니다.',
    description: '요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.',
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    title: '500',
    message: '서버 오류가 발생했습니다.',
    description:
      '죄송합니다. 서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
  },
  [ErrorCode.UNKNOWN]: {
    title: 'Error :(',
    message: '알 수 없는 오류가 발생했습니다.',
    description: '예기치 않은 오류입니다. 홈으로 돌아가 다시 시도해 주세요.',
  },
}
