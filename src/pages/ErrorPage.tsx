import Button from '@components/common/Button'
import { ERROR_MESSAGES } from '@constants/errorMessage'
import { ErrorCode } from '@custom-types/errorCodes'
import { Link, useLocation } from 'react-router-dom'

interface ErrorState {
  code?: ErrorCode
}

const ErrorPage = () => {
  const location = useLocation()
  const state = location.state as ErrorState

  const code: ErrorCode = state?.code || ErrorCode.NOT_FOUND

  const getErrorMessage = (code: ErrorCode) => {
    return ERROR_MESSAGES[code] || ERROR_MESSAGES[ErrorCode.UNKNOWN]
  }
  const { title, message, description } = getErrorMessage(code)

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-primary mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-2">{message}</p>
      <p className="text-gray-500 mb-20">{description}</p>
      <Button>
        <Link to="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}

export default ErrorPage
