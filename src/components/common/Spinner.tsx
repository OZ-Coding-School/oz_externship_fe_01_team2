interface SpinnerProps {
  center?: boolean
  className?: string
}

const Spinner = ({ center = true, className = '' }: SpinnerProps) => {
  const spinnerClass =
    'w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin ' +
    (className ? className : '')

  if (center) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={spinnerClass} />
      </div>
    )
  }

  return <div className={spinnerClass} />
}

export default Spinner
